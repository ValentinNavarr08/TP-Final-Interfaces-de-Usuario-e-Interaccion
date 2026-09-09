export interface MediaItem {
  id: string;
  title: string;
  posterUrl: string;
  year: number;
  genre: string[];
  duration?: number;
  rating?: string;
  progress?: number; // 0-100, para "Seguir viendo"
}