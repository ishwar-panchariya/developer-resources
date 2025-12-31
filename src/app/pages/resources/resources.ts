import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceService } from './resource.service';
import { Resource } from './resource.model';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resources.html'
})
export class Resources implements OnInit {

  category = signal('');
  title = signal('');
  command = signal('');

  categories = ['Angular', 'React', 'Vue', 'Node', 'CSS'];

  // Edit state signals
  editingId = signal<string | null>(null);
  editTitle = signal('');
  editCommand = signal('');

  // Delete modal state
  showDeleteModal = signal(false);
  deleteId = signal<string | null>(null);
  deleteTitle = signal('');

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.loadResources();
  }

  async save() {
    if (!this.category() || !this.title() || !this.command()) return;

    await this.resourceService.addResource({
      category: this.category(),
      title: this.title(),
      command: this.command()
    });

    this.category.set('');
    this.title.set('');
    this.command.set('');
  }

  groupedResources = computed(() => {
    const map: Record<string, Resource[]> = {};

    for (const r of this.resourceService.resources()) {
      console.log(r)
      map[r.category] ??= [];
      map[r.category].push(r);
    }

    return map;
  });

  groupedCategories = computed(() => Object.keys(this.groupedResources()));

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.category.set(value);
  }
  onTitleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.title.set(value);
  }
  onCommandInput(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.command.set(value);
  }

  // ---------- Edit ----------
  startEdit(res: Resource) {
    this.editingId.set(res.id!);
    this.editTitle.set(res.title);
    this.editCommand.set(res.command);
  }

  async saveEdit(id: string) {
    await this.resourceService.updateResource(id, {
      title: this.editTitle(),
      command: this.editCommand()
    });
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editTitle.set('');
    this.editCommand.set('');
  }

  // ---------- Delete ----------
  openDeleteModal(res: Resource) {
    this.deleteId.set(res.id!);
    this.deleteTitle.set(res.title);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.deleteId.set(null);
    this.deleteTitle.set('');
  }

  async confirmDelete() {
    if (!this.deleteId()) return;

    await this.resourceService.deleteResource(this.deleteId()!);
    this.closeDeleteModal();
  }

  resetForm()  {
    this.category.set('');
    this.title.set('');
    this.command.set('');
  }

}
