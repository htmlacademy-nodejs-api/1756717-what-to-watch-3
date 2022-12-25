import { User } from './user.type.js';
import { GenreType } from './genre-type.enum.js';

export type Film = {
  name: string;
  description: string;
  postDate: Date;
  genre: GenreType;
  released: number;
  rating: number;
  previewVideoLink: string;
  videoLink: string;
  starring: string[];
  director: string;
  runTime: number;
  commentsAmount: number;
  user: User;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
