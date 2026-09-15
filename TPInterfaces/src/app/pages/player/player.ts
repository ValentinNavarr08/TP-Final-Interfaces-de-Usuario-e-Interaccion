import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  imports: [FormsModule],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit, OnDestroy {
  @ViewChild('playerRoot') playerRoot!: ElementRef<HTMLDivElement>;

  itemId: string | null = null;

  title = 'The Bear';
  episodeCode = 'T1 E1';
  posterUrl = 'resources/the-bear-hero.png';

  isLoading = false;
  isPlaying = true;
  isMuted = false;
  isSubtitlesOn = false;
  controlsVisible = true;

  // Mock: 25:00 / 52:20 — reemplazar por los valores reales del <video>
  currentTime = 25 * 60;
  duration = 52 * 60 + 20;

  // Pantalla de calificación al pasar de episodio
  showEpisodeRating = false;
  episodeRating = 0;
  hoveredRatingStar = 0;
  reviewText = '';

  private hideControlsTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.resetControlsTimer();
  }

  ngOnDestroy(): void {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
  }

  get progressPercent(): number {
    return this.duration ? (this.currentTime / this.duration) * 100 : 0;
  }

  get currentTimeLabel(): string {
    return this.formatTime(this.currentTime);
  }

  get durationLabel(): string {
    return this.formatTime(this.duration);
  }

  goBack(): void {
    this.location.back();
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    this.resetControlsTimer();
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  toggleSubtitles(): void {
    this.isSubtitlesOn = !this.isSubtitlesOn;
  }

  skipNext(): void {
    // TODO: cuando conectes el <video> real, pausalo acá antes de mostrar la pantalla
    this.isPlaying = false;
    this.showEpisodeRating = true;
    this.controlsVisible = true;
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
  }

  setEpisodeRating(value: number): void {
    this.episodeRating = value;
  }

  submitEpisodeReview(): void {
    // TODO: enviar this.episodeRating / this.reviewText al backend,
    // y ahí sí navegar al siguiente episodio
    this.showEpisodeRating = false;
    this.episodeRating = 0;
    this.reviewText = '';
    this.resetControlsTimer();
  }

  toggleFullscreen(): void {
    const el = this.playerRoot.nativeElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  seek(event: MouseEvent): void {
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    this.currentTime = Math.min(Math.max(ratio, 0), 1) * this.duration;
  }

  @HostListener('mousemove')
  onMouseMove(): void {
    if (this.showEpisodeRating) {
      return;
    }
    this.controlsVisible = true;
    this.resetControlsTimer();
  }

  private resetControlsTimer(): void {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
    if (this.showEpisodeRating) {
      return;
    }
    this.hideControlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.controlsVisible = false;
      }
    }, 3500);
  }

  private formatTime(totalSeconds: number): string {
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}