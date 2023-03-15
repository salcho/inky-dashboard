import { Component } from '@angular/core';
import { Departure, DataService, Stationboard } from '../data.service';

@Component({
  selector: 'app-zvv',
  templateUrl: './zvv.component.html',
  styleUrls: ['./zvv.component.css']
})
export class ZvvComponent {

  error?: string
  trams: Departure[] = [];
  buses: Departure[] = [];

  constructor(private dataService: DataService) {
    this.loadStationboard();
  }

  loadStationboard() {
    this.dataService.fetchStationboard()
      .subscribe(
        latest => { this.getLatestDepartures(latest); this.error = '' },
        error => this.error = `${error.message}`);
  }

  getLatestDepartures(latest: Stationboard) {
    const stationboard: Departure[] = latest.stationboard;

    const trams = new Map();
    const buses = new Map();

    for (const current of stationboard) {
      if (current.category === "T") {
        if (!trams.has(current.number)) {
          trams.set(current.number, current);
          continue;
        }

        if (current.stop.departureTimestamp < trams.get(current.number).stop.departureTimestamp) {
          trams.set(current.number, current);
          continue;
        }
      }

      if (current.category === "B") {
        if (!buses.has(current.number)) {
          buses.set(current.number, current);
          continue;
        }

        if (current.stop.departureTimestamp < buses.get(current.number).stop.departureTimestamp) {
          buses.set(current.number, current);
        }
      }
    }

    this.trams = [];
    this.buses = [];
    trams.forEach(t => this.trams.push(t));
    buses.forEach(b => this.trams.push(b));
  }

  localizedDeparture(departureTimestamp: number): string {
    return new Date(departureTimestamp)
      .toLocaleString("de-CH", { hour: '2-digit', minute: '2-digit' });
  }

  localizedDestination(to: string): string {
    return to.substring(to.indexOf(', ') + 2);
  }
}
