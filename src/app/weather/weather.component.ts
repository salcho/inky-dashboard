import { Component } from '@angular/core';
import { Weather, WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weather?: Weather

  constructor(private weatherService: WeatherService) {}

  loadWeather() {
    this.weatherService.getWeather().subscribe(weather => this.weather = weather);
  }
}
