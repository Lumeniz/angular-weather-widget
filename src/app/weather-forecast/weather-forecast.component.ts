import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { WeatherForecast, WeatherForecastInitial } from "./weather-forecast.model";
import { AppStore } from "../app.store";
import { AppState } from "../app.reducer";
import * as Redux from 'redux';
import { WeatherForecastService } from "./weather-forecast.service";
import { addForecast } from "./weather-forecast.actions";

@Component( {
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.scss']
} )
export class WeatherForecastComponent implements OnInit {
    city: City;
    weather: WeatherForecast;

    constructor(
        private wfService: WeatherForecastService,
        @Inject( AppStore ) private store: Redux.Store<AppState>
    ){

        this.weather = Object.assign( {}, WeatherForecastInitial);

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

        //check if current city exists
        if ( this.city && this.city.id ){

            //if Store has weather forecast for that city, take it from Store
            if ( state.weatherForecasts.ids.includes( this.city.id )) {
                this.weather = state.weatherForecasts.forecasts[this.city.id];

            //if no, getting from external service
            }else {

                this.wfService.getWeatherForecast( this.city.id ).subscribe(
                    ( weatherForecast:WeatherForecast ) => {

                        //immutable changing weather forecast
                        this.weather = Object.assign( {}, weatherForecast );

                        //call action that adding forecast to Store
                        this.store.dispatch( addForecast( this.weather, this.city.id) );
                    }
                );
            }
        }else {
            //Set weather to initial value
            this.weather = Object.assign( {}, WeatherForecastInitial);
        }
    }

    //check if need update component
    updateChecking(  ){

        //get cities from state
        let citiesState = this.store.getState().cities;

        //if city is changed then updating component
        if ( this.city !== citiesState.currentCity ){
            this.updateComp();
        }

    }

    secToMilisec( seconds ){
        return seconds* 1000;
    }

}
