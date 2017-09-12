import { InjectionToken } from "@angular/core";
import { Store, createStore, compose, applyMiddleware } from "redux";
import { AppState, default as reducer } from "./app.reducer";
import { MyCitiesState, initialState as initialStateMyCities } from "./my-cities/my-cities.reducer";
import { initialState as initialStateWeatherForecast } from "./weather-forecast/weather-forecast.reducer";

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
    return next => action =>{
        let returnValue = next( action );

        saveMyCitiesStateToStorage( getState().cities );

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