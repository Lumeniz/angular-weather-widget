import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { appStoreProviders } from "./app.store";
import { CityService } from "./city/city.service";
import { WeatherForecastService } from "./weather-forecast/weather-forecast.service";

import { AppComponent } from './app.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { MyCitiesComponent } from './my-cities/my-cities.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    MyCitiesComponent,
    WeatherComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpModule,
      NgbModule.forRoot(),
      BrowserAnimationsModule
  ],
  providers: [
      appStoreProviders,
      CityService,
      WeatherForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
