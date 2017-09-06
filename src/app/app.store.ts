import { InjectionToken } from "@angular/core";
import { StoreEnhancer, Store, createStore, compose } from "redux";
import { AppState, default as reducer} from "./app.reducer";


export const AppStore = new InjectionToken( 'App.store' );

const devtools: StoreEnhancer<AppState> =
    window['devToolsExtension'] ?
        window['devToolsExtension']() : f => f;

export function createAppStore(): Store<AppState>{
    return createStore<AppState>(
        reducer,
        compose( devtools )
    );
}

export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];