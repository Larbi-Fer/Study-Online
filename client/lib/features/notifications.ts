import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'notifications',
  initialState: [] as NotificationProps[],
  reducers: {
    setNotifications(state, action: {payload: NotificationProps[]}) {
      return action.payload
    },
    receiveNotification(state, action: {payload: NotificationProps}) {
      const i = state.findIndex(n => n.id == action.payload.id)
      if (i == -1) state.unshift(action.payload)
      else {
        state.splice(i, 1);
        state.unshift(action.payload);
      }
    },

    setNotificationSeen(state, action: {payload: string}) {
      const i = state.findIndex(n => n.id == action.payload)
      state[i].isSeen = true
    }
  }
})

export const { setNotifications, receiveNotification, setNotificationSeen } = counterSlice.actions

export default counterSlice.reducer