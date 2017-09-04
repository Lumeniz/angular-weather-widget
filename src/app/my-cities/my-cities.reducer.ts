import { City } from "../city/city.model";
import * as MyCitiesActions from './my-cities.actions';
import { Action } from "redux";

export interface MyCitiesEntities{
    [id: string]: City;

}

export interface MyCitiesState{
    ids: number[];
    currentCity: City,
    myCities: MyCitiesEntities;
}

const initialState: MyCitiesState = {
    ids: [],
    currentCity: null,
    myCities: {}
}

export const MyCitiesReducer = function( state: MyCitiesState = initialState, action: Action ): MyCitiesState{
    switch ( action.type ){
        case MyCitiesActions.ADD_MY_CITY:

            const city = (<MyCitiesActions.AddMyCitiesAction>action).city;

            if ( state.ids.includes( city.id )){
                return state;
            }

            return {
                ids: [ ...state.ids, city.id ],
                currentCity: city,
                myCities: Object.assign({}, state.myCities, {
                    [city.id]: city
                })

            };
    }
}