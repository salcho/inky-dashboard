import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ZvvComponent } from './zvv/zvv.component';
import { WeatherComponent } from './weather/weather.component';
import { EntsorgungComponent } from './entsorgung/entsorgung.component';

@NgModule({
  declarations: [
    AppComponent,
    ZvvComponent,
    WeatherComponent,
    EntsorgungComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
