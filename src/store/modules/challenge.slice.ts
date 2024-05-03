// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface EquationType {
//     firstNumber: number;
//     secondNumber: number;
//     operation: string | null;
//     result: number;
// }

// interface ChallengeState {
//     historyEquations: EquationType[];
// }

// export const initialState: ChallengeState = {
//     historyEquations: []
// }

// export const challengeSlice = createSlice({
//     name: 'getHistory',
//     initialState,
//     reducers: {
//         addEquationHistory: (state, action: PayloadAction<EquationType>) => {
//             state.historyEquations.push(action.payload)
//             return state
//         }
//     }
// })

// export const { addEquationHistory } = challengeSlice.actions
// export default challengeSlice.reducer


import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EquationType {
    firstNumber: number;
    secondNumber: number;
    operation: '+' | '-' | 'x' | '÷' | null
    result: number;
}

interface ChallengeState {

    // historyEquations: EquationType[];
}

export const initialState: EquationType = {
    firstNumber: 0,
    secondNumber: 0,
    operation: null,
    result: 0,
}

export const challengeSlice = createSlice({
    name: 'getHistory',
    initialState,
    reducers: {
        addEquationHistory: (state, action: PayloadAction<EquationType>) => {
            state.firstNumber = action.payload.firstNumber
            state.secondNumber = action.payload.secondNumber
            state.operation = action.payload.operation
            state.result = action.payload.result
            return state
        }
    }
})

export const { addEquationHistory } = challengeSlice.actions
export default challengeSlice.reducer