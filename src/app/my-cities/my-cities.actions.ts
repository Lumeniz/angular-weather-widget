import { Action, ActionCreator } from "redux";
import { City } from "../city/city.model";

/*
 * Add city to MyCities List
 * */
export const ADD_MY_CITY = '[My Cities] Add';

export interface AddMyCitiesAction extends Action{
    city: City
}

export const addMyCity: ActionCreator<AddMyCitiesAction> = ( cityArgs: City ) => {
    const defaults = {
        id: 0,
        name: '',
        country: '',
        coord: null
    }

    const city = Object.assign( {}, defaults, cityArgs );

    return {
        type: ADD_MY_CITY,
        city: city
    };
}
/*
* Set city as current
* */
export const SET_CURRENT_CITY = '[City] Set Current';

export interface SetCurrentCityAction extends Action {
    city: City
}

export const setCurrentCity: ActionCreator<SetCurrentCityAction> =
    ( city ) => ({
        type: SET_CURRENT_CITY,
        city: city
    });

/*
* Remove city from list
* */
export const REMOVE_MY_CITY = '[City] Remove from list of my cities';

export interface RemoveMyCityAction extends Action {
    city_id: number
}

export const removeMyCity: ActionCreator<RemoveMyCityAction> =
    ( city_id ) => ({
        type: REMOVE_MY_CITY,
        city_id: city_id

    });
