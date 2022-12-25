import { GenreType } from '../types/genre-type.enum.js';
import { Film } from '../types/film.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [
    name,
    description,
    createdDate,
    genre,
    released,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    commentsAmount,
    userName,
    email,
    avatarUrl,
    posterImage,
    backgroundImage,
    backgroundColor
  ] = tokens;
  return {
    name,
    description,
    postDate: new Date(createdDate),
    genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'Scifi' | 'Thriller'],
    released: Number(released),
    rating: Number(rating),
    previewVideoLink,
    videoLink,
    starring: starring.split(', ')
      .map((actor) => (actor)),
    director,
    runTime: Number(runTime),
    commentsAmount: Number(commentsAmount),
    user: { userName, email, avatarUrl },
    posterImage,
    backgroundImage,
    backgroundColor,
  } as Film;
};
