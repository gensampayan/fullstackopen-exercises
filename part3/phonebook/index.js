import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "phone": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "phone": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "phone": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "phone": "39-23-6423122"
  }
];

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

app.get(`/api/persons`, (__, response) => {
  response.json(persons)
})

app.get(`/api/info`, (__, response) => {
  response.set('Date', new Date().toUTCString());
  const dateHeader = response.get('Date');
  response.send(`<p>Phonebook has info for ${persons.length} people </p> <br /> <p>${dateHeader}</p>`)
})

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const MaxId = persons.length > 0 
    ? Math.max(...persons.map(p => p.id))
    : 0
  return MaxId + 1
}

app.post(`/api/persons`, (request, response) => {
  const body = request.body;
  const matchName = persons.find(person => person.name === body.name);

  if (!body.name || !body.phone) {
    return response.status(404).send({ error: "field is required."});
  } else if (matchName) {
    return response.status(400).send({ error: "name must be unique."});
  }

  const personDetail = {
    id: generateId(),
    name: body.name,
    phone: body.phone
  }

  persons = persons.concat(personDetail); 
  response.json(personDetail); 
})


app.delete(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
