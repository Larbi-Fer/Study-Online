import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import programmesReducer from './features/programmes'
import lessonReducer from './features/lesson'
import notificationsReducer from './features/notifications'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      programmes: programmesReducer,
      lesson: lessonReducer,
      notifications: notificationsReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']