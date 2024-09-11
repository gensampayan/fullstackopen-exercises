import { createSlice } from '@reduxjs/toolkit'
import blogsService from "../services/blogs.js"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state) {
      return state
    },
    newBlogs(state, action) {
      return [...state, action.payload]
    }
  }
})

export const setAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setAllBlogs(blogs))
  }
}

export const newCreateBlogs = (content) => {
  return async dispatch => {
    const blog = await blogsService.createBlog(content)
    dispatch(newBlogs(blog))
  }
}

export const { setBlogs, newBlogs } = blogsSlice.actions
export default blogsSlice.reducer;