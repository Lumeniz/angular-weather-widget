import { Action, ActionCreator } from "redux";

export const SEARCH_CITY = '[City Search] Search';

export interface SearchCityAction extends Action{
    searchStr: string;
}

export const SeachCity: ActionCreator< SearchCityAction> = ( str: string ) =>({
    type: SEARCH_CITY,
    searchStr: str
})