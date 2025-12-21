import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-date-difference',
  imports: [],
  templateUrl: './date-difference.html',
  styleUrl: './date-difference.scss',
})
export class DateDifference {

  //  Signals
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');

  // Computed Signal Difference
  readonly difference = computed(() => {
      if (!this.startDate() || !this.endDate()) return null;
      
      let start = new Date(this.startDate());
      let end = new Date(this.endDate());

      if (start > end) [start, end] = [end, start];

      // Total Days difference
      const milliSecondPerDay = 24 * 60 * 60 * 1000;
      const totalDays = Math.floor((end.getTime() - start.getTime())/milliSecondPerDay);

      // Calendar Difference (Years, Months, Days)
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      return { years, months, days, totalDays };
  });

  onStartChange(event: Event): void {
    this.startDate.set((event.target as HTMLInputElement).value);
  }

  onEndChange(event: Event): void {
    this.endDate.set((event.target as HTMLInputElement).value);
  }

}
