/**
 * Created by Тим on 07.09.2017.
 */

import { Action, ActionCreator } from "redux";
import { WeatherForecast } from "./weather-forecast.model";

export const ADD_FORECAST = '[Forecast] add new forecast';

export interface AddWeatherForecastAction extends Action{
    forecast: WeatherForecast;
    cityId: number;
}

export const addForecast:ActionCreator<AddWeatherForecastAction> = ( forecast, cityId )=>{
    const forecastDefaults = {
        cityName: '',
        forecast: {}
    }

    const new_forecast = Object.assign( {}, forecastDefaults, forecast );

    return {
        type: ADD_FORECAST,
        forecast: new_forecast,
        cityId: cityId
    }
}