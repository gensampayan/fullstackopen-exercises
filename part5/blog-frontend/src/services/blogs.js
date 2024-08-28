import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response
}

const updateBlog = async (id, updateObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, updateObject, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  removeBlog
}
