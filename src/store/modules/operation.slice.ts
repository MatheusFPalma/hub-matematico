import { createSlice } from "@reduxjs/toolkit";

interface OperationType {
    operationLevel: 'adicao' | 'subtracao' | 'multiplicacao' | 'divisao' | 'fracao' | null,
}

const initialState: OperationType = {
    operationLevel: null,
}

export const operationSlice = createSlice({
    name: "operation",
    initialState,
    reducers: {
        getOperationOne: (state, action) => {
            state.operationLevel = action.payload
            return state
        },
        getOperationTwo: (state, action) => {
            state.operationLevel = action.payload
        }
    }
})

export const { getOperationOne, getOperationTwo } = operationSlice.actions
export default operationSlice.reducer