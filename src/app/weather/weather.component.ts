import { Component } from '@angular/core';
import { Weather, DataService } from '../data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weather?: Weather

  constructor(private dataService: DataService) { }

  loadWeather() {
    this.dataService.getWeather().subscribe(weather => this.weather = weather);
  }

  localizedDate(date: string) {
    return new Date(date).toLocaleString("de-CH", { weekday: 'short' });
  }
}
