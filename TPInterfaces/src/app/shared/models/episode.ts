export interface Episode {
  id: string;
  code: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  rating: number; // 0-5, admite decimales (ej: 4.5)
}

export interface Season {
  number: number;
  episodes: Episode[];
}