import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LifeType {
    lifes: number
    wrongs: number
}

export const initialState: LifeType = {
    lifes: 5,
    wrongs: 0
}

export const lifeSlice = createSlice({
    name: 'showlifes',
    initialState,
    reducers: {
        getLifes: (state, action: PayloadAction<LifeType>) => {
            state.lifes = action.payload.lifes
            state.wrongs = action.payload.wrongs
            return state
        },
        updateLifes: (state, action: PayloadAction<LifeType>) => {
            state.lifes = action.payload.lifes
            state.wrongs = action.payload.wrongs--
        }
    }
})

export const { updateLifes, getLifes } = lifeSlice.actions
export default lifeSlice.reducer