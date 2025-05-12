import { createSlice } from '@reduxjs/toolkit'

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
    nextLessonUser: (state, {payload}: {payload: { id: string, number: number}}) => {
      if(!state || !state.selectedTopic) return

      state.selectedTopic.currentLesson = payload
    },
    enrollInATopic(state, {payload}: {payload: TopicEnrollment}) {
      state?.topicEnrollments.push(payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser, nextLessonUser, enrollInATopic } = counterSlice.actions

export default counterSlice.reducer