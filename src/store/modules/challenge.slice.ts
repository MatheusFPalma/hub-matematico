
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PointRules {
    pointsPerQuestion: number
    scoreCurrentLevel: number,
    countHits?: number
    scoreTotal: number[]
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
    newChallenge: boolean
    actionTimer: boolean
}

export const initialState: ChallengeState = {
    equations: {
        firstNumber: 0,
        secondNumber: 0,
        operation: null,
        result: 0
    },
    rules: {} as PointRules,
    newChallenge: true,
    actionTimer: false
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
                state.rules.countHits = action.payload.countHits
            return state
        },
        updateScore: (state, action: PayloadAction<PointRules>) => {
            if (action.payload.countHits) {
                state.rules.scoreCurrentLevel = action.payload.countHits * action.payload.pointsPerQuestion
                state.rules.scoreTotal.push(action.payload.scoreCurrentLevel)
                return state
            }
        },
        reStartChallenge: (state, action) => {
            state.newChallenge = action.payload
            return state
        },
        actionTimer: (state, action) => {
            state.actionTimer = action.payload
            return state
        }
    }
})

export const { updateInfoOperation, setPointsRules, updateScore, reStartChallenge, actionTimer } = challengeSlice.actions
export default challengeSlice.reducer