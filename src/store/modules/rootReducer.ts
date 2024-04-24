import { combineReducers } from "@reduxjs/toolkit";
import cardsSlice from "./cards.slice";
import operationSlice from "./operation.slice";
import challengeSlice from "./challenge.slice";

export default combineReducers({
    cards: cardsSlice,
    operations: operationSlice,
    challenges: challengeSlice
})