import { City } from "../city/city.model";
/**
 * Created by Тим on 07.09.2017.
 */


export interface IWeatherCurrent {
    id: number;
    name: string;
    sys: any;
    main: any;
    wind: any;
    dt: string;
    dt_txt : string;
}

export interface IWeatherForecast {
    city: City;
    list: IWeatherCurrent[];
}

export const IWeatherCurrentInitial = {
    id: 0,
    name: '',
    sys: {
        country: ''
    },
    main: {
        temp: '',
        humidity: '',
        pressure: ''
    },
    wind: null,
    dt: '',
    dt_txt : ''
};

export const IWeatherForecastInitial = {
    city: null,
    list: []
}


export interface WeatherForecast {
    current: IWeatherCurrent;
    forecast: IWeatherForecast;
}

export const WeatherForecastInitial = {
    current: null,
    forecast: null
}