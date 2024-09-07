import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (contentData) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const objectData = { content: contentData, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, objectData)
  return response.data
}

const voting = async (id, contentData) => {
  const response = await axios.put(`${baseUrl}/${id}`, contentData)
  return response.data
}

export default { getAll, createNew, voting }