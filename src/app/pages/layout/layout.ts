import { Component } from '@angular/core';
import { WorldClock } from '../world-clock/world-clock';
import { DateDifference } from '../date-difference/date-difference';
import { PublicResources } from '../public-resources/public-resources';

@Component({
  selector: 'app-layout',
  imports: [WorldClock, DateDifference, PublicResources],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
