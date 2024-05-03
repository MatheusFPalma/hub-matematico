import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OperationType {
    operationLevel: '+' | '-' | 'x' | '÷' | null,
    gameLevel: 'Fácil' | 'Médio' | 'Difícil' | null
}

const initialState: OperationType = {
    operationLevel: null,
    gameLevel: null
}

export const operationSlice = createSlice({
    name: "operation",
    initialState,
    reducers: {
        getOperationOne: (state, action: PayloadAction<OperationType>) => {
            state.operationLevel = action.payload.operationLevel
            state.gameLevel = action.payload.gameLevel
            return state
        },
        getOperationTwo: (state, action: PayloadAction<OperationType>) => {
            state.operationLevel = action.payload.operationLevel
            state.gameLevel = action.payload.gameLevel
            return state
        }
    }
})

export const { getOperationOne, getOperationTwo } = operationSlice.actions
export default operationSlice.reducer