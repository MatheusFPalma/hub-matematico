import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface OperationType {
    firstCard: number;
    secondCard: number;
    operation: string;
    currentLevel: string;
    loading: boolean
}

export const initialState: OperationType = {
    firstCard: 0,
    secondCard: 0,
    operation: 'adicao' || 'subtracao' || 'multiplicao' || 'divisao' || 'fracao',
    currentLevel: 'Fácil' || 'Médio' || 'Difícil',
    loading: false
}

export const operationSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        listOperation: (state, action: PayloadAction<OperationType>) => {
            state.currentLevel = action.payload.currentLevel
            state.operation = action.payload.operation
            state.firstCard = action.payload.firstCard
            state.secondCard = action.payload.secondCard
            return state
        }
    }
})

export const { listOperation } = operationSlice.actions
export default operationSlice.reducer