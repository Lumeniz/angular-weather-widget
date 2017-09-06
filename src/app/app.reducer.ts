import { Reducer, combineReducers } from "redux";
import { MyCitiesState, MyCitiesReducer } from "./my-cities/my-cities.reducer";

export interface AppState{
    myCities: MyCitiesState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    myCities: MyCitiesReducer,
})

export default rootReducer;