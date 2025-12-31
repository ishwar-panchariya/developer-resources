import { Component, computed, signal } from '@angular/core';
import { ResourceService } from '../resources/resource.service';
import { Resource } from '../resources/resource.model';

@Component({
  selector: 'app-public-resources',
  imports: [],
  templateUrl: './public-resources.html',
  styleUrl: './public-resources.scss',
})
export class PublicResources {

  copiedId = signal<string | null>(null);
  hoveredId = signal<string | null>(null);

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.loadResources();
  }

  groupedResources = computed(() => {
    const map: Record<string, Resource[]> = {};

    for (const r of this.resourceService.resources()) {
      map[r.category] ??= [];
      map[r.category].push(r);
    }

    return map;
  });

  groupedCategories = computed(() => Object.keys(this.groupedResources()));

  copy(text: string, id: string) {
    navigator.clipboard.writeText(text);

    this.copiedId.set(id);

    setTimeout(() => {
      this.copiedId.set(null);
    }, 3000);
  }

}
