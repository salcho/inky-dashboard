import { Component } from '@angular/core';
import { Departure, DataService, Stationboard } from '../data.service';

@Component({
  selector: 'app-zvv',
  templateUrl: './zvv.component.html',
  styleUrls: ['./zvv.component.css']
})
export class ZvvComponent {

  error?: string
  departures: Departure[] = [];

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

    const departures: Map<string, Departure> = new Map();

    const hour = new Date().getHours();
    for (const current of stationboard) {
      if ((hour > 18 || hour < 5) && current.category === 'B') continue;
      if ((hour <= 18 || hour >= 5) && current.category === 'BN') continue;

      const key = `${current.category}${current.number}`;
      const old = departures.get(key);
      if (!old) {
        departures.set(key, current);
        continue;
      }

      if (current.stop.departureTimestamp < old.stop.departureTimestamp) {
        departures.set(current.number, current);
        continue;
      }
    }

    this.departures = [];
    departures.forEach(d => this.departures.push(d));
    // sort alphabetically
    this.departures.sort((a, b) => a.category < b.category ? 1 : -1);
  }

  localizedDeparture(departureTimestamp: number): string {
    return new Date(departureTimestamp)
      .toLocaleString("de-CH", { hour: '2-digit', minute: '2-digit' });
  }

  localizedDestination(to: string): string {
    return to.substring(to.indexOf(', ') + 2);
  }
}
