import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/react";

export interface OperationType {
    cardId: string
    operation: string;
    img: string
}

interface OperationState {
    cards: OperationType[]
}

export const initialState: OperationState = {
    cards: []
}

export const cardsSlice = createSlice({
    name: 'renderCards',
    initialState,
    reducers: {
        renderCards: (state, action: PayloadAction<OperationType>) => {
            state.cards.push(action.payload)
            return state
        }
    }
})

export const { renderCards } = cardsSlice.actions
export default cardsSlice.reducer