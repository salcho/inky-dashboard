import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather() {
    return this.httpClient
      .get<Weather>(
        'https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=803200',
        {});
  }
}

export interface Weather {
  currentWeather: {
    icon: number
  }
  forecast: [{
    dayDate: string,
    iconDay: number,
    precipitation: number,
    temperatureMax: number,
    temperatureMin: number
  }]
}