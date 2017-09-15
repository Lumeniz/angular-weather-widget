/**
 * Created by Тим on 07.09.2017.
 */
import { WeatherForecast } from "./weather-forecast.model";
import { Action } from "redux";
import * as WeatherForecastActions from './weather-forecast.actions';
import { AddWeatherForecastAction } from "./weather-forecast.actions";
import * as _ from 'lodash';


export interface WeatherForecastEntities {
    [id: number]: WeatherForecast;
}
export interface WeatherForecastState {
    ids: number[];
    forecasts: WeatherForecastEntities;
}

export const initialState: WeatherForecastState = {
    ids: [],
    forecasts: {}
}

export const WeatherForecastReducer = function (
    state: WeatherForecastState = initialState, action: Action ): WeatherForecastState{
    switch ( action.type ) {
        case WeatherForecastActions.ADD_FORECAST:

            const cityId = (<AddWeatherForecastAction>action).cityId;
            const forecast = (<AddWeatherForecastAction>action).forecast;

            if ( state.ids.includes( cityId ) ) {
                return state;
            }

            return {
                ids: [...state.ids, cityId],
                forecasts: Object.assign( {}, state.forecasts, { [cityId]: forecast } )
            };

        case WeatherForecastActions.REMOVE_FORECAST:

            const remCityId = (<AddWeatherForecastAction>action).cityId;

            let newIds = [...state.ids ];
            let newForecasts = Object.assign( {}, state.forecasts );

            newIds.splice( newIds.indexOf( remCityId ), 1 );

            return {
                ids: newIds,
                forecasts: _.omit( newForecasts, remCityId )
            };


        default:
            return state;
    }


}