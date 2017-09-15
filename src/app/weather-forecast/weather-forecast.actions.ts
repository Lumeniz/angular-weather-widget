/**
 * Created by Тим on 07.09.2017.
 */

import { Action, ActionCreator } from "redux";
import { WeatherForecast } from "./weather-forecast.model";

export const ADD_FORECAST = '[Forecast] add new weather';

export interface AddWeatherForecastAction extends Action{
    forecast: WeatherForecast;
    cityId: number;
}

export const addForecast:ActionCreator<AddWeatherForecastAction> = ( forecast, cityId )=>{
    const new_forecast = Object.assign( {}, forecast );

    return {
        type: ADD_FORECAST,
        forecast: new_forecast,
        cityId: cityId
    }
}

export const REMOVE_FORECAST = '[Forecast] Remove weather';

export interface RemoveWeatherForecastAction extends Action{
    cityId: number;
}

export const removeForecast:ActionCreator<RemoveWeatherForecastAction> = ( cityId )=>{

    return {
        type: REMOVE_FORECAST,
        cityId: cityId
    }
}