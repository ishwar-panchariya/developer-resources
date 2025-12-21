import { Component, signal } from '@angular/core';
import { WorldClock } from './pages/world-clock/world-clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldClock],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('developer-resources');
}
