import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { MyCitiesComponent } from './my-cities/my-cities.component';
import { WeatherComponent } from './weather/weather.component';
import { appStoreProviders } from "./app.store";
import { CityService } from "./city/city.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    MyCitiesComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
      FormsModule
  ],
  providers: [ appStoreProviders, CityService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
