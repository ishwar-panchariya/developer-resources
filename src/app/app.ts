import { Component, signal } from '@angular/core';
import { WorldClock } from './pages/world-clock/world-clock';
import { DateDifference } from './pages/date-difference/date-difference';
import { RouterOutlet } from "../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldClock, DateDifference],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
