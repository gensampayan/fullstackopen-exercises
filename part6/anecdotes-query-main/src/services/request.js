import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data 
}

export const createNew = async (contentData) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const objectData = { content: contentData, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, objectData)
  return response.data
}

export const voting = async (id, contentData) => {
  const response = await axios.put(`${baseUrl}/${id}`, contentData)
  return response.data
}

export default { getAnecdotes, createNew, voting }