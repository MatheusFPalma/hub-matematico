import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CardType {
    cardId: string
    numberCard: number;
    operation: string | null;
    img: string
}

interface CardState {
    cards: CardType[]
    // lastSelectedCards: string[]
    // lastSelectedNumbers: number[];
    lastSelectedCards: CardType[];
}

export const initialState: CardState = {
    cards: [],
    lastSelectedCards: [],
    // lastSelectedNumbers: [],

}

export const cardsSlice = createSlice({
    name: 'getCards',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.cards = action.payload
            return state
        },
        // removeCard: (state, action: PayloadAction<CardType>) => {
        //     const findCardIdRepeted = action.payload
        //     const cardIdSelected = state.lastSelectedCards.find(item => item.cardId === findCardIdRepeted.cardId)

        //     if (!cardIdSelected) {
        //         state.lastSelectedCards.push(findCardIdRepeted)
        //         return state
        //     }
        //     const indexCardIdSelected = state.lastSelectedCards.findIndex((item) => item.cardId === action.payload.cardId)
        //     state.lastSelectedCards.splice(indexCardIdSelected, 1)
        //     return state
        // },
        // removeShift: (state, action: PayloadAction<CardType>) => {
        //     // Remove o número da primeira carta clicada, mantendo apenas o último
        //     state.lastSelectedCards.shift();
        // },
        setLastSelectedCard: (state, action: PayloadAction<CardType>) => {
            state.lastSelectedCards.push(action.payload);
            return state;
        },
        removeLastSelectedCard: (state, action: PayloadAction<CardType>) => {
            state.lastSelectedCards = state.lastSelectedCards.filter((card) => card.cardId !== action.payload.cardId);
            return state;
        },
        // clearLastSelectedCards: (state) => {
        //     state.lastSelectedCards = [];
        //     return state;
        // }
    }
})

export const { getCards, setLastSelectedCard, removeLastSelectedCard } = cardsSlice.actions
export default cardsSlice.reducer