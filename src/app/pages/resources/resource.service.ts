import { Injectable, signal } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { AuthService } from '../../services/auth.service';
import { db } from '../../../firebase';

export interface Resource {
  id?: string;
  category: string;
  title: string;
  command: string;
}

@Injectable({ providedIn: 'root' })
export class ResourceService {

  readonly resources = signal<Resource[]>([]);
  readonly loading = signal(false);

  constructor(private auth: AuthService) {}

  async loadResources() {
    this.loading.set(true);

    const q = query(
      collection(db, 'resources'),
      orderBy('category')
    );

    const snapshot = await getDocs(q);

    this.resources.set(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Resource)
      }))
    );

    this.loading.set(false);
  }

  async addResource(resource: Resource) {
    if (!this.auth.user()) return;

    await addDoc(collection(db, 'resources'), {
      ...resource,
      createdAt: new Date(),
      createdBy: this.auth.user()?.uid
    });

    await this.loadResources();
  }

  async updateResource(id: string, data: Partial<Resource>) {
    await updateDoc(doc(db, 'resources', id), data);
    await this.loadResources();
  }

  async deleteResource(id: string) {
    await deleteDoc(doc(db, 'resources', id));
    await this.loadResources();
  }
}
