
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PointRules {
    pointsPerQuestion: number | undefined
    scoreCurrentLevel: number | undefined,
    countHits: number
}

interface LevelPoints {
    scoreEachLevel: number | undefined
    scoreTotal: number[]
}

interface LevelState extends Partial<LevelPoints>, Partial<PointRules> { }

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
    score: LevelPoints
}

export const initialState: ChallengeState = {
    equations: {
        firstNumber: 0,
        secondNumber: 0,
        operation: null,
        result: 0
    },
    rules: {} as PointRules,
    score: {} as LevelPoints
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
        updateScore: (state, action: PayloadAction<LevelState>) => {
            state.rules.scoreCurrentLevel = action.payload.countHits! * action.payload.pointsPerQuestion!
            state.score.scoreEachLevel = action.payload.scoreCurrentLevel
            state.score.scoreTotal.push(action.payload.scoreEachLevel!)
            return state
        }
    }
})

export const { updateInfoOperation, setPointsRules, updateScore } = challengeSlice.actions
export default challengeSlice.reducer