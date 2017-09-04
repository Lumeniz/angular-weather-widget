import { Action, ActionCreator } from "redux";
import { City } from "../city/city.model";
import { uuid } from "../util/uuid";

export const ADD_MY_CITY = '[My Cities] Add';

export interface AddMyCitiesAction extends Action{
    city: City
}

export const AddMyCity: ActionCreator<AddMyCitiesAction> = ( cityArgs: City ) => {
    const defaults = {
        id: uuid(),
        name: '',
        aww_id: 0,
        country: '',
        coord: null
    }

    const city = Object.assign( {}, defaults, cityArgs );

    return {
        type: ADD_MY_CITY,
        city: city
    };
}
