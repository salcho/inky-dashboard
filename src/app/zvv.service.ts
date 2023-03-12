import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZvvService {

  constructor(private httpClient: HttpClient) { }

  fetchStationboard() {
    return this.httpClient.get<Stationboard>('https://transport.opendata.ch/v1/stationboard?station=8591233');
  }
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
