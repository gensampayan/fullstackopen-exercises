import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const filterAnecdoteSlice = createSlice({
  name: "filterAnecdote",
  initialState,
  reducers: {
    setFilter(_state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = filterAnecdoteSlice.actions
export default filterAnecdoteSlice.reducer