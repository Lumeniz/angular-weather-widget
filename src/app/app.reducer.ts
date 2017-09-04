import { Reducer, combineReducers } from "redux";
import { City } from "./city/city.model";
import { MyCitiesState, MyCitiesReducer } from "./my-cities/my-cities.reducer";
import { SearchCityState } from "./search-city/search-city.reducer";

export interface AppState{
    myCities: MyCitiesState;
    searchCity: SearchCityState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    myCities: MyCitiesReducer,
    searchCity: SearchCityReducer
})