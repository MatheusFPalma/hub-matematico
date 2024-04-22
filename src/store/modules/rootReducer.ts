import { combineReducers } from "@reduxjs/toolkit";
import cardsSlice from "./cards.slice";
import operationSlice from "./operation.slice";

export default combineReducers({
    cards: cardsSlice,
    operations: operationSlice
})