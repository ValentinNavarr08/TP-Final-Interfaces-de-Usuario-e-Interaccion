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
  private catalogMovieSeed = [
    { id: 'movie-1', title: 'The Silent Horizon', year: 2025, genre: ['Drama'], rating: '+13' },
    { id: 'movie-2', title: 'Neon Circuit', year: 2024, genre: ['Sci-Fi'], rating: '+13' },
    { id: 'movie-3', title: 'Midnight Wire', year: 2023, genre: ['Acción'], rating: '+16' },
    { id: 'movie-4', title: 'Velvet Ash', year: 2024, genre: ['Drama'], rating: '+13' },
    { id: 'movie-5', title: 'Iron Harbor', year: 2021, genre: ['Acción'], rating: '+16' },
    { id: 'movie-6', title: 'Glass Echo', year: 2022, genre: ['Suspenso'], rating: '+13' },
    { id: 'movie-7', title: 'Paper Skyline', year: 2020, genre: ['Comedia'], rating: '+13' },
    { id: 'movie-8', title: 'Solar Rift', year: 2025, genre: ['Sci-Fi'], rating: '+13' },
    { id: 'movie-9', title: 'The Last Beat', year: 2023, genre: ['Musical'], rating: '+13' },
    { id: 'movie-10', title: 'Frost Signal', year: 2024, genre: ['Thriller'], rating: '+16' },
    { id: 'movie-11', title: 'Cinder Run', year: 2022, genre: ['Acción'], rating: '+13' },
    { id: 'movie-12', title: 'Wild Bloom', year: 2021, genre: ['Drama'], rating: '+13' },
  ];

  private catalogSeriesSeed = [
    { id: 'series-1', title: 'Nightline District', year: 2025, genre: ['Crimen'], rating: '+16' },
    { id: 'series-2', title: 'Afterlight', year: 2024, genre: ['Drama'], rating: '+13' },
    { id: 'series-3', title: 'Ashes & Echoes', year: 2023, genre: ['Suspenso'], rating: '+16' },
    { id: 'series-4', title: 'Blue River', year: 2022, genre: ['Drama'], rating: '+13' },
    { id: 'series-5', title: 'Static Reign', year: 2025, genre: ['Sci-Fi'], rating: '+13' },
    { id: 'series-6', title: 'The Hollow Crown', year: 2021, genre: ['Fantasía'], rating: '+13' },
    { id: 'series-7', title: 'Signal House', year: 2024, genre: ['Crimen'], rating: '+16' },
    { id: 'series-8', title: 'Sunset Arcade', year: 2020, genre: ['Comedia'], rating: '+13' },
    { id: 'series-9', title: 'Amber Lane', year: 2023, genre: ['Drama'], rating: '+13' },
    { id: 'series-10', title: 'Sector Nine', year: 2025, genre: ['Sci-Fi'], rating: '+16' },
    { id: 'series-11', title: 'Kite Theory', year: 2022, genre: ['Acción'], rating: '+16' },
    { id: 'series-12', title: 'Museum of Dust', year: 2024, genre: ['Misterio'], rating: '+13' },
  ];

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
      { title: 'Novedades', items: this.generateItems(10, 15) },
      { title: 'Terror', items: this.generateItems(20, 15) },
      { title: 'Clasicos', items: this.generateItems(30, 15) },
      { title: 'Animacion', items: this.generateItems(40, 15) },
      { title: 'Crimen', items: this.generateItems(50, 15) },
      { title: 'Suspenso', items: this.generateItems(60, 15) },
      { title: 'SuperHeroes', items: this.generateItems(70, 15) },
    ];
  }

  getCatalogItems(mode: 'peliculas' | 'series'): MediaItem[] {
    const source = mode === 'peliculas' ? this.catalogMovieSeed : this.catalogSeriesSeed;

    return source.map(item => ({
      ...item,
      posterUrl: `https://picsum.photos/seed/${item.id}/400/255`,
    }));
  }
}