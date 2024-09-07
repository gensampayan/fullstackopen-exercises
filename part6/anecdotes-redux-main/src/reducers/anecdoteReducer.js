import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes.js"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(anecdote => 
        anecdote.id === action.payload.id 
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(_state,action) {
      return action.payload
    }
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createNewAnecdote = (contentData) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(contentData)
    dispatch(addAnecdote(newAnecdote))
  }
} 

export const votingAnecdote = (data) => {
  return async dispatch => {
    const contentData = { content: data.content, votes: data.votes + 1 }
    const anecdoteToVote = await anecdoteService.voting(data.id, contentData)
    dispatch(voteAnecdote(anecdoteToVote))
  }
}

export const { voteAnecdote, addAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer