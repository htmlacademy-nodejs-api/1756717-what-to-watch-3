import { User } from './user';

export type Film = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
  user: User;
  imageStatus?: boolean;
};

export type CreateFilm = Omit<Film, 'postDate' | 'id' | 'commentsAmount' | 'rating' | 'isFavorite' | 'user'>;
