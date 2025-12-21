import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, ElementRef, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface WorldCity {
  country: string;
  city: string;
  gmtOffset: number;
}

interface TimeZoneItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-world-clock',
  imports: [CommonModule, FormsModule],
  templateUrl: './world-clock.html',
  styleUrl: './world-clock.scss',
})
export class WorldClock implements OnInit, OnDestroy {

  // ---------- Signals ---------- 
  readonly timezones = signal<TimeZoneItem[]>([]); 
  readonly selectedZone = signal<TimeZoneItem | null>(null); 
  readonly now = signal<Date>(new Date()); 
  
  private timerId?: number; 
  private selectRef?: ElementRef<HTMLSelectElement>;

  constructor(private http: HttpClient) { 
    // React whenever selected timezone or time changes 
    effect(() => {
      const zone = this.selectedZone();
      if (zone && this.selectRef) {
        this.selectRef.nativeElement.value = zone.id;
      }
    }); 
  } 
  
  ngOnInit(): void { 
    this.loadTimeZones(); 
    this.startClock(); 
  } 
  
  ngOnDestroy(): void { 
    if (this.timerId) { 
      clearInterval(this.timerId); 
    }
  } 
  
  // ---------- Data Loading ---------- 
  private loadTimeZones(): void {
    this.http
      .get<TimeZoneItem[]>('public/world-timezones.json')
      .subscribe(data => {
        this.timezones.set(data);

        const systemZoneId =
          Intl.DateTimeFormat().resolvedOptions().timeZone;

        const systemZone =
          data.find(z => z.id === systemZoneId) ?? null;

        // Fallback to first entry if system zone is not found
        this.selectedZone.set(systemZone ?? data[0] ?? null);
      });
  } 
    
  // ---------- Clock ---------- 
  private startClock(): void { 
    this.timerId = window.setInterval(() => { 
      this.now.set(new Date()); 
    }, 1000); 
  } 
  
  // ---------- UI Events ---------- 
  onZoneChange(event: Event): void { 
    const value = (event.target as HTMLSelectElement).value; 
    const zone = this.timezones().find(z => z.id === value) ?? null; 
    this.selectedZone.set(zone); 
  } 
  
  // ---------- Computed Values ---------- 
  readonly formatter = computed(() => { 
    const zone = this.selectedZone(); 
    if (!zone) { return null; } 
    return new Intl.DateTimeFormat('en-US', { 
      timeZone: zone.id, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true, 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    }); 
  }); 
  
  readonly formattedTime = computed(() => { 
    const fmt = this.formatter(); 
    return fmt ? fmt.format(this.now()).split(',')[1].trim() : ''; 
  }); 
    
  readonly formattedDate = computed(() => { 
    const fmt = this.formatter(); return fmt ? fmt.format(this.now()).split(',')[0] : ''; 
  });
}
