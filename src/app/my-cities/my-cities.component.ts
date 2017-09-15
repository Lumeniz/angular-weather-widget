import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { AppStore } from "../app.store";
import * as Redux from 'redux';
import { AppState } from "../app.reducer";
import * as MyCitiesActions from '../my-cities/my-cities.actions';
import * as WeatherForecastActions from '../weather-forecast/weather-forecast.actions';
import { getMyCities, getMyCitiesEntities, getCitiesState } from "./my-cities.reducer";


@Component( {
    selector: 'app-my-cities',
    templateUrl: './my-cities.component.html',
    styleUrls: ['./my-cities.component.scss']
} )
export class MyCitiesComponent implements OnInit {
    myCities: City[];
    currentCityId: number;

    constructor( @Inject( AppStore ) private store: Redux.Store<AppState> ){

        //listening store for changes and then update our component
        this.store.subscribe( () =>{
            if ( this.myCities != getMyCities( this.store.getState() )
                || this.currentCityId != getCitiesState( this.store.getState() ).currentCity.id  )
                this.updateComp();
        } );
        //update component on startup
        this.updateComp();
    }

    ngOnInit(){
    }


    updateComp(){
        //get my cities from store
        this.myCities = getMyCities( this.store.getState() ) ;

        this.currentCityId = getCitiesState( this.store.getState() ).currentCity.id;
    }

    //call actions that will set city as current
    setCurrentCity( city: City ){
        this.store.dispatch( MyCitiesActions.setCurrentCity( city ) );
    }


    removeMyCity( city_id, event ){
        //removing city from Store
        this.store.dispatch( MyCitiesActions.removeMyCity( city_id ) );
        //removing city weather forecast from Store
        this.store.dispatch( WeatherForecastActions.removeForecast( city_id ) );

        //prevent click action from other parent elements in view
        event.preventDefault();

    }
}
