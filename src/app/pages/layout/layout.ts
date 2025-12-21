import { Component } from '@angular/core';
import { WorldClock } from '../world-clock/world-clock';
import { DateDifference } from '../date-difference/date-difference';

@Component({
  selector: 'app-layout',
  imports: [WorldClock, DateDifference],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
