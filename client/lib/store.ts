import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import programmesReducer from './features/programmes'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      programmes: programmesReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']