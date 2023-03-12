import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ZvvComponent } from './zvv/zvv.component';
import { WeatherComponent } from './weather/weather.component';
import { FetchWeatherComponent } from './fetch-weather/fetch-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    ZvvComponent,
    WeatherComponent,
    FetchWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
