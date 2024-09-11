import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer.js"

const store = configureStore({
  reducer: {
    blog: blogReducer
  }
})

export default store