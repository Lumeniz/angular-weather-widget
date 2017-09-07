import { Reducer, combineReducers } from "redux";
import { MyCitiesState, MyCitiesReducer } from "./my-cities/my-cities.reducer";
import { WeatherForecastState, WeatherForecastReducer } from "./weather-forecast/weather-forecast.reducer";

export interface AppState{
    cities: MyCitiesState;
    weatherForecasts: WeatherForecastState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    cities: MyCitiesReducer,
    weatherForecasts: WeatherForecastReducer
})

export default rootReducer;