/**
 * Created by Тим on 31.08.2017.
 */

import { City } from "./city.model";
import { Action } from "redux";
import * as CurrentCityActions from "./current-city.actions";

export interface CurrentCityState {
    currentCity: City
}

const initialState: CurrentCityState = {
    currentCity: null
}

export const UserReducer = function ( state: CurrentCityState = initialState, action: Action ): CurrentCityState{
    switch( action.type ) {
        case CurrentCityActions.SET_CURRENT_CITY:
            const city: City = (<CurrentCityActions.SetCurrentCityAction>action).city;
            return {
                currentCity: city
            }
        default:
            return state;
    }
    
}