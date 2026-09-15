import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../core/layout/header/header';
import { CarouselRow } from '../../shared/components/carousel-row/carousel-row';
import { Card } from '../../shared/components/card/card';
import { Content, ContentRow } from '../../core/services/content';
import { Footer } from '../../shared/components/footer/footer';
import { MediaItem } from '../../shared/models/media-item';
import { Dropdown } from '../../shared/components/dropdown/dropdown';

@Component({
  selector: 'app-home',
  imports: [Header, CarouselRow, Footer, Card, Dropdown],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  rowsBeforeBanner: ContentRow[] = [];
  rowsAfterBanner: ContentRow[] = [];

  catalogMode: 'home' | 'peliculas' | 'series' = 'home';
  catalogItems: MediaItem[] = [];
  filteredCatalogItems: MediaItem[] = [];
  selectedGenre = 'Todos';
  selectedYear = 'Todos';
  genres = ['Todos', 'Acción', 'Drama', 'Sci-Fi', 'Crimen', 'Comedia', 'Suspenso', 'Fantasía'];
  years = ['Todos', '2025', '2024', '2023', '2022', '2021', '2020'];

  targetDate: Date = new Date(Date.now() + (5 * 3600 + 40 * 60 + 32) * 1000);
  hours = '00';
  minutes = '00';
  seconds = '00';
  hoursPulse = false;
  minutesPulse = false;
  secondsPulse = false;

  private intervalId?: ReturnType<typeof setInterval>;

  constructor(
    private contentService: Content,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const currentPath = this.route.snapshot.url[0]?.path ?? 'home';
    this.catalogMode = currentPath === 'peliculas' || currentPath === 'series' ? currentPath : 'home';

    if (this.catalogMode === 'home') {
      this.loadHomeRows();
    } else {
      this.loadCatalogItems();
    }

    this.updateCountdown();
    this.intervalId = window.setInterval(() => {
      this.updateCountdown();
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedGenre = value;
    this.applyCatalogFilters();
  }

  onYearChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedYear = value;
    this.applyCatalogFilters();
  }

  private loadHomeRows(): void {
    const rows = this.contentService.getRows();
    const bannerIndex = rows.findIndex(r => r.title === 'Crimen');

    if (bannerIndex === -1) {
      this.rowsBeforeBanner = rows;
      this.rowsAfterBanner = [];
    } else {
      this.rowsBeforeBanner = rows.slice(0, bannerIndex + 1);
      this.rowsAfterBanner = rows.slice(bannerIndex + 1);
    }

    this.catalogItems = [];
    this.filteredCatalogItems = [];
  }

  private loadCatalogItems(): void {
    const catalogType: 'peliculas' | 'series' = this.catalogMode === 'series' ? 'series' : 'peliculas';
    this.catalogItems = this.contentService.getCatalogItems(catalogType);
    this.applyCatalogFilters();
  }

  private applyCatalogFilters(): void {
    const genreFilter = this.selectedGenre === 'Todos' ? null : this.selectedGenre;
    const yearFilter = this.selectedYear === 'Todos' ? null : Number(this.selectedYear);

    this.filteredCatalogItems = this.catalogItems.filter((item) => {
      const matchesGenre = !genreFilter || item.genre.some((g) => g.toLowerCase() === genreFilter.toLowerCase() || g.toLowerCase() === 'sci-fi' && genreFilter.toLowerCase() === 'sci-fi');
      const matchesYear = !yearFilter || item.year === yearFilter;
      return matchesGenre && matchesYear;
    });
  }

  private updateCountdown(): void {
    const diffMs = Math.max(0, this.targetDate.getTime() - Date.now());
    const totalSeconds = Math.floor(diffMs / 1000);

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const nextHours = String(h).padStart(2, '0');
    const nextMinutes = String(m).padStart(2, '0');
    const nextSeconds = String(s).padStart(2, '0');

    this.hoursPulse = this.hours !== nextHours;
    this.minutesPulse = this.minutes !== nextMinutes;
    this.secondsPulse = this.seconds !== nextSeconds;

    this.hours = nextHours;
    this.minutes = nextMinutes;
    this.seconds = nextSeconds;

    this.cdr.markForCheck();
  }

  onGenreSelect(value: string): void {
  this.selectedGenre = value;
  this.applyCatalogFilters();
}

onYearSelect(value: string): void {
  this.selectedYear = value;
  this.applyCatalogFilters();
}
}