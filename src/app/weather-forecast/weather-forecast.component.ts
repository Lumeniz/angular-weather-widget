import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { WeatherForecast } from "./weather-forecast.model";
import { AppStore } from "../app.store";
import { AppState } from "../app.reducer";
import * as Redux from 'redux';
import { WeatherForecastService } from "./weather-forecast.service";
import { addForecast } from "./weather-forecast.actions";

@Component( {
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.css']
} )
export class WeatherForecastComponent implements OnInit {
    city: City;
    forecast: WeatherForecast;

    constructor(
        private wfService: WeatherForecastService,
        @Inject( AppStore ) private store: Redux.Store<AppState>
    ){

        this.store.subscribe( () =>{
            this.updateChecking( );
        } );

        this.updateChecking( );
    }

    ngOnInit(){
    }

    updateComp(){

        const state = this.store.getState();
        this.city =    state.cities.currentCity;

        if ( this.city && this.city.id ){

            if ( state.weatherForecasts.ids.includes( this.city.id ))
                this.forecast = state.weatherForecasts.forecasts[this.city.id];
            else {
                const forecast = this.wfService.getForecast( this.city.awwId )
                    .then( ( forecast )=>{
                        this.forecast = forecast;
                        this.store.dispatch( addForecast( forecast, this.city.id) );
                } );
            }
        }else {
            this.forecast = null;
        }
    }

    updateChecking(  ){

        let citiesState = this.store.getState().cities;

        if ( this.city !== citiesState.currentCity ){
            this.updateComp();
        }

    }

}
