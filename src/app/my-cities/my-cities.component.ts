import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { AppStore } from "../app.store";
import * as Redux from 'redux';
import { AppState } from "../app.reducer";
import * as MyCitiesActions from '../my-cities/my-cities.actions';
import * as WeatherForecastActions from '../weather-forecast/weather-forecast.actions';
import { getMyCities } from "./my-cities.reducer";


@Component( {
    selector: 'app-my-cities',
    templateUrl: './my-cities.component.html',
    styleUrls: ['./my-cities.component.scss']
} )
export class MyCitiesComponent implements OnInit {
    myCities: City[];

    constructor( @Inject( AppStore ) private store: Redux.Store<AppState> ){

        //listening store for changes and then update our component
        this.store.subscribe( () =>{
            if ( this.myCities != getMyCities( this.store.getState() ) )
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

        console.log( this.myCities );
    }

    setCurrentCity( city: City ){
        this.store.dispatch( MyCitiesActions.setCurrentCity( city ) );
    }


    removeMyCity( city_id, event ){
        this.store.dispatch( MyCitiesActions.removeMyCity( city_id ) );
        this.store.dispatch( WeatherForecastActions.removeForecast( city_id ) );

        //prevent click action from other parent elements in view
        event.preventDefault();

    }
}
