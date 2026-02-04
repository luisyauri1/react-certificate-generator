import { configureStore } from '@reduxjs/toolkit'
import certificatesReducer from './certificatesSlice'

export const store = configureStore({
  reducer: {
    certificates: certificatesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
