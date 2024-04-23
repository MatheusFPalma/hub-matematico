import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/react";

export interface CardType {
    cardId: string
    numberCard: number;
    operation: string;
    img: string
}

interface CardState {
    cards: CardType[]
}

export const initialState: CardState = {
    cards: []
}

export const cardsSlice = createSlice({
    name: 'getCards',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.cards = action.payload
            return state
        }
    }
})

export const { getCards } = cardsSlice.actions
export default cardsSlice.reducer