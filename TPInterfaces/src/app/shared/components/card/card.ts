import { Component, Input } from '@angular/core';
import { MediaItem } from '../../models/media-item';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input({ required: true }) item!: MediaItem;

  isLiked = false;

  toggleLike(event: Event): void {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
  }
}