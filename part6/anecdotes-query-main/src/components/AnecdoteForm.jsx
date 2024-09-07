import { useAnecdoteDispatch, addNotification } from "../AnecdoteContext"

const AnecdoteForm = ({ onAnecdoteMutation }) => {
  const dispatch = useAnecdoteDispatch()
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      const errorMessage = "Anecdote is too short, must have length 5 or more"
      addNotification(dispatch, errorMessage, 5000)
    } else {
      onAnecdoteMutation(content)
      const message = `added '${content}'`
      addNotification(dispatch, message, 5000)
      event.target.anecdote.value = ''
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm