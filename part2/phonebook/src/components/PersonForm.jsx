
const PersonForm = ({ onAdd, dataName, onName, dataNumber, onNumber }) => {
  return (
    <>
      <form onSubmit={onAdd}>
        <div>
          name: 
          <input 
            value={dataName}
            onChange={onName}
          />
        </div>
        <div>
          number: 
          <input 
            value={dataNumber}
            onChange={onNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm;
