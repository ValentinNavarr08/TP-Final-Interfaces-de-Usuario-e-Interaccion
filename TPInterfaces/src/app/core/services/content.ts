import { Injectable } from '@angular/core';
import { MediaItem } from '../../shared/models/media-item';

export interface ContentRow {
  title: string;
  items: MediaItem[];
  featured?: boolean;
  showDots?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Content {

  private generateItems(seedStart: number, count: number, withProgress = false): MediaItem[] {
    return Array.from({ length: count }, (_, i) => {
      const seed = seedStart + i;
      return {
        id: `item-${seed}`,
        title: `Título ${seed}`,
        posterUrl: `https://picsum.photos/seed/${seed}/400/225`,
        year: 2020 + (seed % 5),
        genre: ['Drama'],
        rating: '+13',
        ...(withProgress ? { progress: Math.floor(Math.random() * 90) + 10 } : {})
      };
    });
  }

  getRows(): ContentRow[] {
    return [
      { title: 'Seguir Viendo', items: this.generateItems(1, 3, true), featured: true, showDots: false },
      { title: 'Novedades', items: this.generateItems(10, 6) },
      { title: 'Terror', items: this.generateItems(20, 6) },
      { title: 'Clasicos', items: this.generateItems(30, 6) },
      { title: 'Animacion', items: this.generateItems(40, 6) },
      { title: 'Crimen', items: this.generateItems(50, 6) },
      { title: 'Suspenso', items: this.generateItems(60, 6) },
      { title: 'SuperHeroes', items: this.generateItems(70, 6) },
    ];
  }
}