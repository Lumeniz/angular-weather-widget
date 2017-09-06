import { Component, OnInit, Inject } from '@angular/core';
import { City } from "../city/city.model";
import { AppStore } from "../app.store";
import * as Redux from 'redux';
import { AppState } from "../app.reducer";
import * as _ from 'lodash';
import * as MyCitiesActions from '../my-cities/my-cities.actions';


@Component( {
    selector: 'app-my-cities',
    templateUrl: './my-cities.component.html',
    styleUrls: ['./my-cities.component.scss']
} )
export class MyCitiesComponent implements OnInit {
    myCities: City[];

    constructor( @Inject( AppStore ) private store: Redux.Store<AppState> ){
        this.store.subscribe( () =>{
            this.updateComp();
        } );
        this.updateComp();
    }

    ngOnInit(){
    }

    updateComp(){

        this.myCities = _.values( this.store.getState().myCities.myCities );


        console.log( this.myCities );
    }

    setCurrentCity( city: City ){
        this.store.dispatch( MyCitiesActions.setCurrentCity( city ) );
    }


    removeMyCity( city_id, event ){
        this.store.dispatch( MyCitiesActions.removeMyCity( city_id ) );
        event.preventDefault();

    }
}
