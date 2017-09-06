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

    findCities( searchStr: string ){

        if ( !searchStr.trim() )
            return [];

        return _.filter( this.cities, ( city:City ) => {
            return city.name.toLowerCase().match( searchStr.toLowerCase() ) ;
        });

    }

    parseCities( citiesList: any ){

        const defaultCity: City = {
                id: uuid(),
                name: '',
                aww_id: null,
                country: '',
                coord: null

            };

        let cities: City[] = citiesList.map( (city) => {
            return Object.assign( {}, defaultCity, city, { id: uuid(), aww_id: city.id } );
        });

        this.cities = _.sortBy( cities, 'name' );

    }

}