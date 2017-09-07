import { Injectable } from '@angular/core';
import { City } from "./city.model";
import * as citiesList from '../city.ua.list';
import { uuid } from "../util/uuid";
import * as _ from "lodash";


@Injectable()
export class CityService {
    cities: City[] = [];

    constructor(){

        this.parseCities( citiesList.cities );

    }
/*
* Find city by name
* */
    findCities( searchStr: string ){

        if ( !searchStr.trim() )
            return [];

        return _.filter( this.cities, ( city:City ) => {
            return city.name.toLowerCase().match( searchStr.toLowerCase() ) ;
        });

    }
/*
* Create list of cities with type City
* */
    parseCities( citiesList: any ){

        const defaultCity: City = {
                id: uuid(),
                name: '',
                awwId: null,
                country: '',
                coord: null

            };

        //generate id for city with function uuid()
        //external city id moving to aww_id
        let cities: City[] = citiesList.map( (city) => {
            return Object.assign( {}, defaultCity, city, { id: uuid(), awwId: city.id } );
        });

        this.cities = _.sortBy( cities, 'name' );

    }

}