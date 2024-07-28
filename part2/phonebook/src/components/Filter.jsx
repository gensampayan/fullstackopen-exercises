
const Filter = ({ data, onFilter }) => {
  return (
    <>
      <input 
        value={data}
        onChange={onFilter}
      />
    </>
  )
}

export default Filter;
