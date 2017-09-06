import { City } from "../city/city.model";
import * as MyCitiesActions from './my-cities.actions';
import { Action } from "redux";
import * as _ from 'lodash';

export interface MyCitiesEntities{
    [id: string]: City;

}

export interface MyCitiesState{
    ids: string[];
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
                currentCity: Object.assign({}, city),
                myCities: Object.assign({}, state.myCities, {
                    [city.id]: city
                })

            };

        case MyCitiesActions.SET_CURRENT_CITY:
            const newCurCity: City = (<MyCitiesActions.SetCurrentCityAction>action).city;

            return {
                ids: state.ids,
                currentCity: Object.assign( {}, newCurCity ),
                myCities: state.myCities
            }

        case MyCitiesActions.REMOVE_MY_CITY:
            const city_id = (<MyCitiesActions.RemoveMyCityAction>action).city_id;

            const newIds = [ ...state.ids ];

            newIds.splice( state.ids.indexOf( city_id ), 1 );

            let newMyCities = Object.assign({}, state.myCities);

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