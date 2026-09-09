import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../core/layout/header/header';
import { CarouselRow } from '../../shared/components/carousel-row/carousel-row';
import { Content, ContentRow } from '../../core/services/content';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, CarouselRow, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  rowsBeforeBanner: ContentRow[] = [];
  rowsAfterBanner: ContentRow[] = [];

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
  ) {}

  ngOnInit(): void {
    const rows = this.contentService.getRows();
    const bannerIndex = rows.findIndex(r => r.title === 'Crimen');

    if (bannerIndex === -1) {
      this.rowsBeforeBanner = rows;
      this.rowsAfterBanner = [];
    } else {
      this.rowsBeforeBanner = rows.slice(0, bannerIndex + 1);
      this.rowsAfterBanner = rows.slice(bannerIndex + 1);
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
}