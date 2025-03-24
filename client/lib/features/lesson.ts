import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'lesson',
  initialState: { lessonId: null } as { lessonId: string } | { lessonId: null },
  reducers: {
    setLesson: (state, action: { payload: { lessonId: string } }) => {
      return action.payload;
    },
    clearLesson: (state) => {
      return { lessonId: null };
    }
  }
})

export const { setLesson, clearLesson } = counterSlice.actions

export default counterSlice.reducer