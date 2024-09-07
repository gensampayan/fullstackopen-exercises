import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createNew, voting } from './services/request.js'
import { useAnecdoteValue, useAnecdoteDispatch, addNotification } from './AnecdoteContext.jsx'

const App = () => {
  const notificationValue = useAnecdoteValue()
  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] },
        anecdotes.concat(newAnecdote)
      )
    } 
  })

  const updateMutation = useMutation({
    mutationFn: voting,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      const mappedUpadtedAnecdote = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] },
        mappedUpadtedAnecdote
      )
    }    
  })  

  const handleVote = ({ id, content, votes}) => {
    const contentData = { content, votes: votes + 1 }
    updateMutation.mutate(id, contentData)
  }  

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>Error: Can not reach server.</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification 
        notify={notificationValue}
      />
      <AnecdoteForm 
        onAnecdoteMutation={newAnecdoteMutation.mutate}
      />
    
      {anecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote({ id: anecdote.id, content: anecdote.content, votes: anecdote.votes })}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
