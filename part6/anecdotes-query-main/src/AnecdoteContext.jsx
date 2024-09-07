import { createContext, useContext, useReducer } from "react";

const anecdoteReducer = (state, action) => {
  switch(action.type) {
    case "setNotification":
      return action.payload
    case "clearNotification":
      return ""
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [anecdote, anecdoteDispatch] = useReducer(anecdoteReducer, "")

  return (
    <AnecdoteContext.Provider value={[anecdote, anecdoteDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdoteValue = () => {
  const elementValue = useContext(AnecdoteContext)
  return elementValue[0]
}

export const useAnecdoteDispatch = () => {
  const elementValue = useContext(AnecdoteContext)
  return elementValue[1]
}

export const addNotification = (dispatch, message, timeout) => {
  dispatch({ type: "setNotification", payload: message })
  setTimeout(() => {
    dispatch({ type: "clearNotification" })
  }, timeout)
}

export default AnecdoteContext