import { Injectable } from '@angular/core';
import { AWW_CONFIG } from '../config';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WeatherForecastService {

    constructor( private http: Http ){
    }

    getForecast( cityId ): Promise<any>{

        const url = `${AWW_CONFIG.weather_urls.city_current}${cityId}&appid=${AWW_CONFIG.api_key}`;

        return this.http.get( url ).toPromise()
            .then( this.parseResponse )
            .catch( this.handleError );

    }

    parseResponse( response ){
            let data = response.json();
            return {
                cityName: `${data.name} (${data.sys.country})`,
                forecast: data
            }
    }

    handleError( error ): Promise<any> {
        console.error( 'An error occurred', error );
        return Promise.reject( error.message || error );
    }


}
