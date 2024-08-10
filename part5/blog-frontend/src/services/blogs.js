import axios from 'axios'
const baseUrl = '/api/blogs'

let token = '';

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; 
  }
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config);
  return response;
}

export default { 
  setToken,
  getAll,
  createBlog
}
