import axios from "axios";

const baseUrl = `/api/persons`;

const getAllData = async () => {
  const request = axios.get(`${baseUrl}`)
  const response = await request;
  return response.data;
}

const createData = async (newObject) => {
  const request = axios.post(`${baseUrl}`, newObject)
  const response = await request;
  return response.data;
}

const updateData =  async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request;
  return response.data;
}

const deleteData = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.status;
}

export {
  getAllData,
  createData,
  updateData,
  deleteData
}
