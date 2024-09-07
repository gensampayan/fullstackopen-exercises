import { useAnecdoteValue } from "../AnecdoteContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationValue = useAnecdoteValue()

  if (notificationValue === "") return null 

  return (
    <div style={style}>
      <div>{notificationValue}</div>
    </div>
  )
}

export default Notification