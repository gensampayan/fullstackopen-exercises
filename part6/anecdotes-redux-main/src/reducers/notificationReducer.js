import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNofitication(_state, action) {
      return action.payload
    },
    clearNotification() {
      return '';
    }
  }
})

export const setNotification = (content, timeInSeconds) => {
  return dispatch => {
    dispatch(displayNofitication(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds)
  }
}

export const { displayNofitication, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer