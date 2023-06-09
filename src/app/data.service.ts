import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  // undocumented - https://github.com/search?q=meteoswiss%20api&type=repositories
  getWeather() {
    return this.httpClient.get<Weather>('http://localhost:3000/meteo');
  }

  // https://transport.opendata.ch/docs.html
  fetchStationboard() {
    return this.httpClient.get<Stationboard>('https://transport.opendata.ch/v1/stationboard?station=8591233');
  }

  // https://www.stadt-zuerich.ch/portal/de/index/ogd/anwendungen/2019/open_erz_api.html
  fetchEntsorgung() {
    return this.httpClient.get<Calendar>('http://localhost:3000/entsorgung');
  }
}

export interface Calendar {
  result: [CalendarEntry]
}

export interface CalendarEntry {
  date: string,
  type: string
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

export interface Stationboard {
  stationboard: Departure[];
}

export interface Departure {
  to: string;
  number: string;
  category: string;
  stop: {
    departureTimestamp: number;
    departure: string;
  }
}