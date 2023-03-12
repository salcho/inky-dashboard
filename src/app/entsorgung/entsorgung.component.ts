import { Component } from '@angular/core';
import { CalendarEntry, DataService } from '../data.service';

@Component({
  selector: 'app-entsorgung',
  templateUrl: './entsorgung.component.html',
  styleUrls: ['./entsorgung.component.css']
})
export class EntsorgungComponent {
  collection?: CalendarEntry;

  constructor(private dataService: DataService) { }

  loadCalendar() {
    // fetch only the first entry, which corresponds to this week's collection
    this.dataService.fetchEntsorgung().subscribe(collection => { if (collection.result.length) this.collection = collection.result[0] });
  }
}
