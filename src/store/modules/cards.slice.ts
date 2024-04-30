import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CardType {
    cardId: string
    numberCard: number;
    operation: string | null;
    img: string
}

interface CardState {
    cards: CardType[]
    lastSelectedCards: CardType[];
}

export const initialState: CardState = {
    cards: [],
    lastSelectedCards: [],
}

export const cardsSlice = createSlice({
    name: 'getCards',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.cards = action.payload
            return state
        },
        setLastSelectedCard: (state, action: PayloadAction<CardType>) => {
            state.lastSelectedCards.push(action.payload);
            return state;
        },
        removeLastSelectedCard: (state, action: PayloadAction<CardType>) => {
            const data = state.lastSelectedCards.find(item => item.cardId === action.payload.cardId)
            if (data) {
                const index = state.lastSelectedCards.findIndex((item) => item.cardId === data.cardId)
                state.lastSelectedCards.splice(index, 1)
                return state
            }
        }
    }
})

export const { getCards, setLastSelectedCard, removeLastSelectedCard } = cardsSlice.actions
export default cardsSlice.reducer