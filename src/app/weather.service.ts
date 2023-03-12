import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather() {
    return this.httpClient.get<Weather>('http://localhost:3000');
  }
}

export interface Weather {
  currentWeather: {
    icon: number
    iconName?: string
  }
  forecast: [{
    dayDate: string,
    iconDay: number,
    iconName?: string,
    precipitation: number,
    temperatureMax: number,
    temperatureMin: number
  }]
}