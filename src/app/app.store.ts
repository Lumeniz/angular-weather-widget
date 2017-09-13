import { InjectionToken } from "@angular/core";
import { Store, createStore, compose, applyMiddleware } from "redux";
import { AppState, default as reducer } from "./app.reducer";
import { MyCitiesState, initialState as initialStateMyCities } from "./my-cities/my-cities.reducer";
import { initialState as initialStateWeatherForecast } from "./weather-forecast/weather-forecast.reducer";
import * as MyCitiesActions from './my-cities/my-cities.actions';

export const AppStore = new InjectionToken( 'App.store' );

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const saveMyCitiesStateToStorage = function ( citiesState: MyCitiesState ){
    if ( window.localStorage ) {
        window.localStorage.setItem(
            'cities',
            JSON.stringify( citiesState )
        );
    }
}

const getMyCitiesStateFromStorage = function (): MyCitiesState{
    if ( window.localStorage && window.localStorage.getItem( 'cities' ) ) {
        return JSON.parse( window.localStorage.getItem( 'cities' ) );
    } else {
        return initialStateMyCities;
    }

}


function saveMyCitiesState( { getState } ){

    const actionsForSaveCities = [
        MyCitiesActions.ADD_MY_CITY,
        MyCitiesActions.REMOVE_MY_CITY,
        MyCitiesActions.SET_CURRENT_CITY
    ];

    return next => action =>{

        let returnValue = next( action );

        if( actionsForSaveCities.includes( action.type ) ){
            saveMyCitiesStateToStorage( getState().cities );
        }

        return returnValue;
    }
}


export function createAppStore(): Store<AppState>{
    return createStore<AppState>(
        reducer,
        {
            cities: getMyCitiesStateFromStorage(),
            weatherForecasts: initialStateWeatherForecast
        },

        composeEnhancers(
            applyMiddleware(saveMyCitiesState),
        )

    );
}

export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];