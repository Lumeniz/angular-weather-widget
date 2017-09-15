import { Injectable } from '@angular/core';
import { AWW_CONFIG } from '../config';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {
    IWeatherCurrent, IWeatherCurrentInitial, IWeatherForecast,
    IWeatherForecastInitial, WeatherForecast
} from "./weather-forecast.model";
import { Observable } from "rxjs";

@Injectable()
export class WeatherForecastService {

    forecastResultLimit = 9;
    currentUrl = `${AWW_CONFIG.weather_urls.city_current}&appid=${AWW_CONFIG.api_key}&cnt=${this.forecastResultLimit}&id=`;
    forecastUrl = `${AWW_CONFIG.weather_urls.city_5days}&appid=${AWW_CONFIG.api_key}&cnt=${this.forecastResultLimit}&id=`;


    constructor( private http: Http ){
    }

    getWeatherForecast( cityId ):Observable<WeatherForecast>{

        const currentUrl = this.currentUrl + cityId ;
        const forecastUrl = this.forecastUrl + cityId;

        return Observable.zip(
            this.http.get( currentUrl ),
            this.http.get( forecastUrl),
            ( currentRes:Response, forecastRes: Response ) => {

                return {
                    current: this.parseResponseCurrent( currentRes ),
                    forecast: this.parseResponseForecast( forecastRes )
                }
            }
        ).catch(
            error =>{
                console.error( error );
                return Observable.of(`Error in Getting Weather Forecast: ${error}`);
        });

    }

    parseResponseCurrent( response: Response ):IWeatherCurrent{
        return Object.assign( {}, IWeatherCurrentInitial, response.json() );
    }

    parseResponseForecast( response: Response ):IWeatherForecast{
        return Object.assign( {}, IWeatherForecastInitial, response.json() );
    }

}
