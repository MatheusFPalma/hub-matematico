
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PointRules {
    pointsPerQuestion: number
    scoreCurrentLevel: number,
    scoreTotal: number,
}

export interface ChallengeType {
    firstNumber: number;
    secondNumber: number;
    operation: '+' | '-' | 'x' | '÷' | null
    result: number;
}

interface ChallengeState {
    equations: {
        firstNumber: number,
        secondNumber: number,
        operation: '+' | '-' | 'x' | '÷' | null
        result: number,
    },
    rules: PointRules
}

export const initialState: ChallengeState = {
    equations: {
        firstNumber: 0,
        secondNumber: 0,
        operation: null,
        result: 0
    },
    rules: {} as PointRules
}

export const challengeSlice = createSlice({
    name: 'getHistory',
    initialState,
    reducers: {
        updateInfoOperation: (state, action: PayloadAction<ChallengeType>) => {
            state.equations.firstNumber = action.payload.firstNumber
            state.equations.secondNumber = action.payload.secondNumber
            state.equations.operation = action.payload.operation
            state.equations.result = action.payload.result
            return state
        },
        setPointsRules: (state, action: PayloadAction<PointRules>) => {
            state.rules.pointsPerQuestion = action.payload.pointsPerQuestion,
                state.rules.scoreCurrentLevel = action.payload.scoreCurrentLevel,
                state.rules.scoreTotal = action.payload.scoreTotal
            return state
        }
    }
})

export const { updateInfoOperation, setPointsRules } = challengeSlice.actions
export default challengeSlice.reducer