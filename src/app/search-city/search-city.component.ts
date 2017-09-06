import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { CityService } from "../city/city.service";
import { AppStore } from "../app.store";
import { AppState } from "../app.reducer";
import * as Redux from 'redux';
import * as MyCitiesActions from "../my-cities/my-cities.actions";

@Component( {
    selector: 'app-search-city',
    templateUrl: './search-city.component.html',
    styleUrls: ['./search-city.component.scss']
} )
export class SearchCityComponent implements OnInit {
    searchStr: string;
    searchResults: City[];

    constructor( private cityService: CityService, @Inject( AppStore ) private store: Redux.Store<AppState> ){

    }

    ngOnInit(){
    }

    searchCities(){
        this.searchResults = this.cityService.findCities( this.searchStr );
    }

    addToMyCities( city: City ){
        this.store.dispatch( MyCitiesActions.addMyCity( city ) );
    }

}
