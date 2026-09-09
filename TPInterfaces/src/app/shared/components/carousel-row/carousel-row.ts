import { Component, Input } from '@angular/core';
import { Card } from '../card/card';
import { MediaItem } from '../../models/media-item';

@Component({
  selector: 'app-carousel-row',
  imports: [Card],
  templateUrl: './carousel-row.html',
  styleUrl: './carousel-row.css'
})
export class CarouselRow {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) items: MediaItem[] = [];
  @Input() featured: boolean = false;
  @Input() showDots: boolean = true;
}