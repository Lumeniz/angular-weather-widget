import { Action, ActionCreator } from "redux";
import { City } from "./city.model";

export const SET_CURRENT_CITY = '[City] Set Current';

export interface SetCurrentCityAction extends Action{
    city: City
}

export const setCurrentCity: ActionCreator<SetCurrentCityAction> =
    ( city ) => ({
        type:SET_CURRENT_CITY,
        city: city
    });