import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface FormState {
    isOpen: boolean;
}

const initialState: FormState = {
    isOpen: false,
}


export const formSlice = createSlice({
  name: 'form',
  initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        },
        change: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { open, close, change } = formSlice.actions

export const selectFormState = (state: RootState) => state.formState

export default formSlice.reducer