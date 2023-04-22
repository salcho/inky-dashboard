import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showTime() {
    return new Date().toLocaleString("de-CH", { hour: '2-digit', minute: '2-digit' });
  }
}