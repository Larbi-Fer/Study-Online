import { createSlice } from '@reduxjs/toolkit'

interface UserProps {
  id?: string;
  fullname?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  lesson?: {
    topicId: string;
    number: number;
  }
  lessonId?: string;
  level: number;
}

export const counterSlice = createSlice({
  name: 'user',
  initialState: null as UserProps | null,
  reducers: {
    setUser: (state, action: { payload: UserProps }) => {
      return action.payload;
    },
    clearUser: (state) => {
      state = null;
    },
    nextLessonUser: (state, {payload}: {payload: { lesson?: {topicId: string, number: number}, lessonId?: string }}) => {
      if(!state) return
      state.lesson = payload.lesson
      state.lessonId = payload.lessonId
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser, nextLessonUser } = counterSlice.actions

export default counterSlice.reducer