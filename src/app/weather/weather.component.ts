import { Component } from '@angular/core';
import { Weather, DataService } from '../data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  error?: string
  weather?: Weather

  constructor(private dataService: DataService) { this.loadWeather(); }

  loadWeather() {
    this.dataService.getWeather()
      .subscribe(weather => { this.weather = weather; this.error = '' },
        error => this.error = `${error.message}`,
        () => { });
  }

  localizedDate(date: string) {
    return new Date(date).toLocaleString("de-CH", { weekday: 'short' });
  }
}
