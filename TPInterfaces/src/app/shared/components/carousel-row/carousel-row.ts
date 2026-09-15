import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from '../card/card';
import { MediaItem } from '../../models/media-item';

@Component({
  selector: 'app-carousel-row',
  imports: [Card],
  templateUrl: './carousel-row.html',
  styleUrl: './carousel-row.css'
})
export class CarouselRow {
  @ViewChild('track') private track?: ElementRef<HTMLElement>;

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) items: MediaItem[] = [];
  @Input() featured: boolean = false;
  @Input() showDots: boolean = true;

  currentPage = 0;
  private readonly itemsPerPage = 6;
  private readonly pageStep = this.itemsPerPage - 1;

  get totalPages(): number {
    if (!this.showDots) {
      return 1;
    }

    return Math.max(1, Math.ceil((this.items.length - this.itemsPerPage) / this.pageStep) + 1);
  }

  get pageIndexes(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index);
  }

  selectPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 0), this.totalPages - 1);

    requestAnimationFrame(() => {
      const track = this.track?.nativeElement;
      const firstItem = track?.children[this.currentPage * this.pageStep] as HTMLElement | undefined;
      const viewport = track?.parentElement;

      if (!track || !firstItem || !viewport) {
        return;
      }

      const peekOffset = firstItem.offsetWidth * 0.18;
      const targetScroll = firstItem.offsetLeft - peekOffset;

      track.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    });
  }
}