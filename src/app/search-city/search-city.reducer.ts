import { Action } from "redux";
import * as SearchCityActions from './search-city.actions';

export interface SearchCityState{
    searchCity: string
}

const initialState: SearchCityState = {
    searchCity: ''
}

export const SearchCitiesReducer = function( state: SearchCityState = initialState, action: Action ): SearchCityState{
    switch ( action.type ){
        case SearchCityActions.SEARCH_CITY:
            return state;
    }

}