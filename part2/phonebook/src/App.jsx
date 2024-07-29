import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import { 
  getAllData, 
  createData, 
  updateData, 
  deleteData 
} from './services/peopleService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    getAllData()
      .then(initialData => {
        setPersons(initialData)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    console.log("effect")
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  }

  const handleNumber = (e) => {
    setNumber(e.target.value);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase());
    console.log(foundPerson);

    if (foundPerson) {
      const windowConfirm = window.confirm(`${newName} is already added to phonebook, would you like to replace the number withe new one?`);

      if (windowConfirm) {
        const updatedPerson = { ...foundPerson, phone: number }
        console.log("🚀 - handleAdd - updatedPerson:", updatedPerson)
  
        updateData(foundPerson.id, updatedPerson)
          .then(returnedData => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedData));
            setNewName("");
            setNumber("");
            setMessages(`Updated phone number of ${foundPerson.name} successfully.`);
            setTimeout(() => {
              setMessages(null)
            }, 5000);
          }) 
          .catch(error => {
            console.error("Error updating data:", error);
          });
      }
    } else {
      createData({ name: newName, phone: number })
        .then(returnedData => {
          setPersons(persons.concat(returnedData));
          setNewName("");
          setNumber("");
          setMessages(`Added ${returnedData.name} successfully.`)
          setTimeout(() => {
            setMessages(null)
          }, 5000)
        })
        .catch(error => {
          console.error("Error adding data:", error);
          setMessages(`Failed to add.`);
          setTimeout(() => {
            setMessages(null)
          }, 5000);
        });
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const handleDelete = (id) => {
    const findPersonById = persons.find(person => person.id === id);
    const personName = findPersonById?.name;

    if (findPersonById) {
      const windowConfirm = window.confirm(`Delete ${personName} ?`);

      if (windowConfirm) {
        deleteData(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
            setMessages(`Information of ${personName} is remove successfully.`);
            setTimeout(() => {
              setMessages(null)
            }, 5000)
          })
          .catch(error => {
            console.error("Their is something wrong:", error);
            setMessages(`Information of ${personName} has already been removed from server.`);
            setTimeout(() => {
              setMessages(null)
            }, 3000);
          });
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { messages && <Notification message={messages}/> }
      <div>
        filter shown with 
      </div>
      <Filter
          data={filter}
          onFilter={handleFilter}
      />
      <br />
      <h2>Add new</h2>
      <PersonForm
        onAdd={handleAdd}
        dataName={newName}
        onName={handleName}
        dataNumber={number}
        onNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons
        dataPerson={personsToShow}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  )
}

export default App;
