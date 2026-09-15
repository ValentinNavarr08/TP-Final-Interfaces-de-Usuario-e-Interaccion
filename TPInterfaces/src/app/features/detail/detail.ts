import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';
import { Season } from '../../shared/models/episode';
import { Comment } from '../../shared/models/comment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  imports: [Footer, FormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})

export class Detail {
  itemId: string | null = null;

  title = 'The Bear';
  year = 2022;
  genre = 'Drama';
  heroImageUrl = 'resources/the-bear-hero.png';
  synopsis = 'Después de una brillante carrera como chef en uno de los mejores restaurantes del mundo, Carmy regresa a Chicago, su ciudad, para tratar de reflotar el desastroso restaurante de su hermano Mike, después de que este decidiera poner fin a su vida.';

  isSeries = true;
  isFavorite = false;
  isNotifyOn = false;

  selectedSeason = 1;
  isSeasonMenuOpen = false;

  hoveredEpisodeId: string | null = null;
  openCommentsEpisodeId: string | null = null;

  newCommentText = '';
  newCommentRating = 0;
  hoveredStar = 0;

  commentsByEpisode: Record<string, Comment[]> = {
    'ep-1': [
      { id: 'c1', username: 'User889', rating: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      { id: 'c2', username: 'User347', rating: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      { id: 'c3', username: 'User102', rating: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    ],
  };

  seasons: Season[] = [
    {
      number: 1,
      episodes: [
        {
          id: 'ep-1',
          code: 'T1 E1',
          title: 'T1 E1',
          thumbnailUrl: 'https://picsum.photos/seed/bear1/512/308',
          duration: '40:00 mins',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          rating: 5,
        },
        {
          id: 'ep-2',
          code: 'T1 E2',
          title: 'Titulo',
          thumbnailUrl: 'https://picsum.photos/seed/bear2/512/308',
          duration: '40:00 mins',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          rating: 5,
        },
        {
          id: 'ep-3',
          code: 'T1 E3',
          title: 'Titulo',
          thumbnailUrl: 'https://picsum.photos/seed/bear3/512/308',
          duration: '40:00 mins',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          rating: 4.5,
        },
        {
          id: 'ep-4',
          code: 'T1 E4',
          title: 'Titulo',
          thumbnailUrl: 'https://picsum.photos/seed/bear4/512/308',
          duration: '40:00 mins',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          rating: 3.5,
        },
      ],
    },
    { number: 2, episodes: [] },
    { number: 3, episodes: [] },
  ];

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
  }

  get currentEpisodes() {
    return this.seasons.find(s => s.number === this.selectedSeason)?.episodes ?? [];
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  toggleNotify(): void {
    this.isNotifyOn = !this.isNotifyOn;
  }

  toggleSeasonMenu(): void {
    this.isSeasonMenuOpen = !this.isSeasonMenuOpen;
  }

  selectSeason(num: number): void {
    this.selectedSeason = num;
    this.isSeasonMenuOpen = false;
  }

  starPercentages(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => {
      const diff = rating - i;
      if (diff >= 1) return 100;
      if (diff <= 0) return 0;
      return diff * 100;
    });
  }

  toggleComments(episodeId: string): void {
    this.openCommentsEpisodeId = this.openCommentsEpisodeId === episodeId ? null : episodeId;
    this.newCommentText = '';
    this.newCommentRating = 0;
  }

  commentsFor(episodeId: string): Comment[] {
    return this.commentsByEpisode[episodeId] ?? [];
  }

  setNewCommentRating(value: number): void {
    this.newCommentRating = value;
  }

  submitComment(episodeId: string): void {
    const text = this.newCommentText.trim();
    if (!text || this.newCommentRating === 0) return;

    if (!this.commentsByEpisode[episodeId]) {
      this.commentsByEpisode[episodeId] = [];
    }

    this.commentsByEpisode[episodeId] = [
      ...this.commentsByEpisode[episodeId],
      {
        id: 'c-' + Date.now(),
        username: 'Tú',
        rating: this.newCommentRating,
        text,
      },
    ];

    this.newCommentText = '';
    this.newCommentRating = 0;
  }
}