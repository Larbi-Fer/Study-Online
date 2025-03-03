import { createSlice } from '@reduxjs/toolkit'

interface UserProps {
  id?: string;
  fullname?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export const counterSlice = createSlice({
  name: 'user',
  // initialState: { user: null as UserProps | null },
  initialState: null as UserProps | null,
  reducers: {
    setUser: (state, action: { payload: UserProps }) => {
      return action.payload;
    },
    clearUser: (state) => {
      state = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = counterSlice.actions

export default counterSlice.reducer