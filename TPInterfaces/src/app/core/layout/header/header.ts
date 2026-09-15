import { Component, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NotificationItem {
  show: string;
  episode: string;
  status: string;
}

type ContentFilter = 'Todos' | 'Series' | 'Películas';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isNotificationsOpen = false;
  isProfileMenuOpen = false;
  isFilterOpen = false;

  selectedFilter: ContentFilter = 'Todos';
  filterOptions: ContentFilter[] = ['Todos', 'Series', 'Películas'];

  notifications: NotificationItem[] = [
    { show: 'The Bear', episode: 'T2 E1', status: 'Nuevo Episodio · Ya disponible' },
    { show: 'The Bear', episode: 'T2 E2', status: 'Nuevo Episodio · Ya disponible' },
    { show: 'The Bear', episode: 'T2 E3', status: 'Nuevo Episodio · Ya disponible' },
  ];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncFilterFromRoute());

    this.syncFilterFromRoute();
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.isProfileMenuOpen = false;
    this.isFilterOpen = false;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    this.isNotificationsOpen = false;
    this.isFilterOpen = false;
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
    this.isNotificationsOpen = false;
    this.isProfileMenuOpen = false;
  }

  selectFilter(option: ContentFilter): void {
    this.selectedFilter = option;
    this.isFilterOpen = false;

    const routeMap: Record<ContentFilter, string> = {
      Todos: '/home',
      Series: '/series',
      Películas: '/peliculas',
    };

    this.router.navigateByUrl(routeMap[option]);
  }

  private syncFilterFromRoute(): void {
    const currentPath = this.router.url.split('?')[0].replace('/', '');

    if (currentPath === 'series') {
      this.selectedFilter = 'Series';
      return;
    }

    if (currentPath === 'peliculas') {
      this.selectedFilter = 'Películas';
      return;
    }

    this.selectedFilter = 'Todos';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isNotificationsOpen = false;
      this.isProfileMenuOpen = false;
      this.isFilterOpen = false;
    }
  }
}