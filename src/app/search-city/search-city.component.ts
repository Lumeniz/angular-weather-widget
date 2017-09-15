import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { CityService } from "../city/city.service";
import { AppStore } from "../app.store";
import { AppState } from "../app.reducer";
import * as Redux from 'redux';
import * as MyCitiesActions from "../my-cities/my-cities.actions";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from "rxjs";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { isCityInMyCities } from "../my-cities/my-cities.reducer";

@Component( {
    selector: 'app-search-city',
    templateUrl: './search-city.component.html',
    styleUrls: ['./search-city.component.scss'],
    animations: [
        //animation for button Add
        trigger( 'searchCitySelectedAnimation', [
            state( 'hide', style( { opacity: 0 } ) ),
            state( 'show', style( { opacity: 1 } ) ),
            transition( '*=>hide', animate( '0.5s ease-out' ) ),
            transition( '*=>show', animate( '0.5s ease-in' ) )
        ] ),

        //animation for Alert message
        trigger( 'alertAnimation', [
            state( 'hide', style( { opacity: 0 } ) ),
            state( 'show', style( { opacity: 1 } ) ),
            transition( '*=>hide', animate( '0.5s ease-out' ) ),
            transition( '*=>show', animate( '0.5s ease-in' ) )
        ] )
    ]
} )
export class SearchCityComponent implements OnInit {
    searchStr: string;
    searchSelectedCity: City;
    alertMsg: string;

    alertMessages = {
        CITY_ALREADY_ADDED: 'This city already in list of MyCities'
    };

    constructor( private cityService: CityService, @Inject( AppStore ) private store: Redux.Store<AppState> ){

    }

    ngOnInit(){
    }


    /*
    * Component ngbTypeahead
    * */

    //change returned value for result of search
    formatter = ( result: City ) => result.name;

    //change returned value for input element
    formatterInput = ( result: City ) => result.name;

    //action when clicking to item in search results list
    selectCity = ( result ) =>{
        this.searchSelectedCity = result.item;
    };

    //action for ng-bootstrap component ngbTypeahead ( search input )
    search = ( text$: Observable<string> ) =>
        text$
            //delay before fire action
            .debounceTime( 200 )
            .distinctUntilChanged()
            .map( term =>{
                this.searchSelectedCity = null;
                return term === '' ? []
                    : this.cityService.findCities( term ).slice( 0, 10 )
    } );

    /*
    * End component ngbTypeahead
    * */

    //action when clicking on button add
    addToMyCities(){

        //check if this city already in list
        if ( !isCityInMyCities( this.store.getState(), this.searchSelectedCity  ) )
            //if no, then add city to MyCities in Store
            this.store.dispatch( MyCitiesActions.addMyCity( this.searchSelectedCity ) );
        else
            this.alertMsg = this.alertMessages.CITY_ALREADY_ADDED;

        //reset input element and temp variable
        this.searchSelectedCity = null;
        this.searchStr = '';

    }

}
