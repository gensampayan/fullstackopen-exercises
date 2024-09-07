import { useSelector, useDispatch } from 'react-redux'
import { votingAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filtered = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleVoteAnecdote = (content, id, votes) => {
    dispatch(votingAnecdote({ id, content, votes }));
    dispatch(setNotification(`you voted '${content}'`, 5000))
  };

  const filteredAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filtered.toLowerCase())
  )
  
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteAnecdote(anecdote.content, anecdote.id, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList