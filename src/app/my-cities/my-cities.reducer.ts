import { City } from "../city/city.model";
import * as MyCitiesActions from './my-cities.actions';
import { Action } from "redux";
import * as _ from 'lodash';
import { createSelector } from "reselect";

export interface MyCitiesEntities{
    [id: number]: City;
}

export interface MyCitiesState{
    ids: number[];
    currentCity: City,
    myCities: MyCitiesEntities;
}

export const initialState: MyCitiesState = {
    ids: [],
    currentCity: null,
    myCities: {}
}

export const MyCitiesReducer = function( state: MyCitiesState = initialState, action: Action ): MyCitiesState{
    switch ( action.type ){

        case MyCitiesActions.ADD_MY_CITY:

            const city = (<MyCitiesActions.AddMyCitiesAction>action).city;

            //if new city in list do nothing
            if ( state.ids.includes( city.id )){
                return state;
            }

            return {
                ids: [ ...state.ids, city.id ],
                currentCity: Object.assign({}, city),
                myCities: Object.assign({}, state.myCities, {
                    [city.id]: city
                })

            };

        case MyCitiesActions.SET_CURRENT_CITY:
            const newCurCity: City = (<MyCitiesActions.SetCurrentCityAction>action).city;

            const oldCity = state.currentCity;

            return {
                ids: state.ids,
                currentCity: ( oldCity.id == newCurCity.id )? state.currentCity: Object.assign( {}, newCurCity ),
                myCities: state.myCities
            }

        case MyCitiesActions.REMOVE_MY_CITY:
            const city_id = (<MyCitiesActions.RemoveMyCityAction>action).city_id;

            //new  variable with ids
            let newIds = [ ...state.ids ];
            //remove city id from list
            newIds.splice( state.ids.indexOf( city_id ), 1 );


            //new  list of cities
            let newMyCities = Object.assign({}, state.myCities);

            //if removed city is current then change current city to first in list
            //else don't change current city
            let cur_city = ( city_id !== state.currentCity.id )?
                state.currentCity:
                ( state.myCities[ newIds[0] ]);


            return {
                ids: newIds,
                currentCity: cur_city,
                myCities:  _.omit( newMyCities, city_id )

            };


        default:
            return state;
    }
}

//selectors for state
export const getCitiesState = ( state ): MyCitiesState => state.cities;

export const getMyCitiesEntities = createSelector(
    getCitiesState,

    ( state: MyCitiesState ) => state.myCities

);

export const getMyCities = createSelector(
    getMyCitiesEntities,
    ( myCitiesEntities: MyCitiesEntities ):City[] => {
        return _.values( myCitiesEntities );
    }
);