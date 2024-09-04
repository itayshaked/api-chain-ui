import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './cardsSlice'
import formReducer from './formSlice'

export const store = configureStore({
  reducer: {
        cardsState: cardsReducer,
        formState: formReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store