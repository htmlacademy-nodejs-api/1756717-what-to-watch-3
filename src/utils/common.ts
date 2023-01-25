import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
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

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message,
});