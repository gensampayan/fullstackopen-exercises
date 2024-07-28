
const Persons = ({ dataPerson, onDelete }) => {
  return (
    <>
      {dataPerson.map((person, index) => (
        <div key={index}>
          {person.name} {person.phone} <button onClick={() => onDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons;
