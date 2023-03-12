import { Component } from '@angular/core';
import { Departure, ZvvService } from '../zvv.service';

@Component({
  selector: 'app-zvv',
  templateUrl: './zvv.component.html',
  styleUrls: ['./zvv.component.css']
})
export class ZvvComponent {

  trams: Departure[] = [];
  buses: Departure[] = [];

  constructor(private zvvService: ZvvService) {}

  loadStationboard() {
    this.zvvService.fetchStationboard().subscribe(latest => {
      const stationboard: Departure[] = latest.stationboard;
      
      const trams = new Map();
      const buses = new Map();

      for (const mean of stationboard) {
        if (mean.category === "T") {
          if (!trams.has(mean.number)) {
            trams.set(mean.number, mean);
            continue;
          }

          if (mean.stop.departureTimestamp > trams.get(mean.number).stop.departureTimestamp) {
            trams.set(mean.number, mean);
            continue;
          }
        }

        if (mean.category === "B") {
          if (!buses.has(mean.number)) {
            buses.set(mean.number, mean);
            continue;
          }
          
          if (mean.stop.departureTimestamp > buses.get(mean.number).stop.departureTimestamp) {
            buses.set(mean.number, mean);
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
      .toLocaleString("en-UK", { hour: '2-digit', minute: '2-digit' });
  }

  localizedDestination(to: string): string {
    return to.substring(to.indexOf(', ') + 2);
  }
}
