import { Component } from '@angular/core';
import { Departure, DataService } from '../data.service';

@Component({
  selector: 'app-zvv',
  templateUrl: './zvv.component.html',
  styleUrls: ['./zvv.component.css']
})
export class ZvvComponent {

  trams: Departure[] = [];
  buses: Departure[] = [];

  constructor(private dataService: DataService) {}

  loadStationboard() {
    this.dataService.fetchStationboard().subscribe(latest => {
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
      buses.forEach(b => this.buses.push(b));
    })
  }

  localizedDeparture(departureTimestamp: number): string {
    return new Date(departureTimestamp)
      .toLocaleString("de-CH", { hour: '2-digit', minute: '2-digit' });
  }

  localizedDestination(to: string): string {
    return to.substring(to.indexOf(', ') + 2);
  }
}
