import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CurlRequestCardType, FormRequestCardType, GenericCardType } from '@/types'


export interface CardsState {
  cards: GenericCardType[]
  selectedCard: string | null
}

const initialState: CardsState = {
  cards: [{
    id: "1",
    type: "curl",
    title: "Curl Request",
    description: "A curl request",
    curl: "curl -X GET https://jsonplaceholder.typicode.com/posts/1",
  }],
  selectedCard: null
}

type IDPayload = {
    id: string;
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    add: (state,action: PayloadAction<GenericCardType>) => {
      state.cards.push(action.payload)
    },
    remove: (state, action: PayloadAction<IDPayload>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.id)
    },
    putCard: (state, action: PayloadAction<string|null>) => {
      state.selectedCard = action.payload
    },
    updateCurlCard: (state, action: PayloadAction<CurlRequestCardType>) => {
      state.cards = state.cards.map(card => {
        if (card.id === action.payload.id) {
          return action.payload
        }
        return card
      })
    },
    updateFormCard: (state, action: PayloadAction<FormRequestCardType>) => {
      state.cards = state.cards.map(card => {
        if (card.id === action.payload.id) {
          return action.payload
        }
        return card
      })
    },
  }
})

export const { add, remove, putCard, updateCurlCard, updateFormCard } = cardsSlice.actions
type SelctCard = (state: RootState) => GenericCardType | null
export const selectCards = (state: RootState) => state.cardsState.cards
export const selectCard: SelctCard = (state: RootState) => {
  const selected = state.cardsState.cards.find((card) => card.id === state.cardsState.selectedCard)
    if (selected) {
    return selected
  }
  return null
}
  

export default cardsSlice.reducer