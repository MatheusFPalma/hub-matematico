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
    targetCurrentStatement: number
}

export const initialState: CardState = {
    cards: [],
    lastSelectedCards: [],
    targetCurrentStatement: 0
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
        },
        valueCurrentStatement: (state, action) => {
            state.targetCurrentStatement = action.payload
            return state
        }
    }
})

export const { getCards, setLastSelectedCard, removeLastSelectedCard, valueCurrentStatement } = cardsSlice.actions
export default cardsSlice.reducer