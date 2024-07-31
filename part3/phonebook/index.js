import express, { request } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import Phonebook from "./models/phonebook.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('dist'));
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req) => req.method !== 'POST' 
}));
app.use(cors());

app.get(`/api/persons`, (__, response, next) => {
  Phonebook.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error));
})

app.get(`/api/persons/:id`, (request, response, next) => {
  Phonebook.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post(`/api/persons`, (request, response, next) => {
  const body = request.body;
  
  if (!body.name || !body.phone) {
    return response.status(404).send({ error: "field is required."});
  } 

  const personDetail = new Phonebook({
    name: body.name,
    phone: body.phone
  })

  personDetail.save()
  .then(detail => {
    response.json(detail);
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.name || !body.phone) {
    return response.status(400).send({ error: "Field 'name' and 'phone' are required." });
  }

  try {
    const personWithSameName = await Phonebook.findOne({ name: body.name });

    if (personWithSameName && personWithSameName._id.toString() !== id) {
      return response.status(400).send({ error: "Name must be unique." });
    }

    const updatedPerson = await Phonebook.findOneAndUpdate(
      { _id: id },
      { phone: body.phone },
      { new: true, useFindAndModify: false }
    );

    if (!updatedPerson) {
      return response.status(404).send({ error: "Person not found." });
    }

    response.json(updatedPerson);
  } catch (error) {
    next(error); 
  }
});

app.delete(`/api/persons/:id`, (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
