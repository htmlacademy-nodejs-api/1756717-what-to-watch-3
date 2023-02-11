import CommentDto from '../../dto/comment/comment.dto.js';
import FilmShortDto from '../../dto/film/film-short.dto.js';
import FilmDto from '../../dto/film/film.dto.js';
import UpdateFilmDto from '../../dto/film/update-film.dto.js';
import UserWithTokenDto from '../../dto/user/user-with-token.dto.js';
import UserDto from '../../dto/user/user.dto.js';
import { Film } from '../../types/film.js';
import { Review } from '../../types/review.js';
import { User } from '../../types/user.js';

export const adaptLoginToClient = (user: UserWithTokenDto): User => ({
  name: user.userName,
  email: user.email,
  avatarUrl: user.avatarUrl,
  token: user.token,
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.userName,
  email: user.email,
  avatarUrl: user.avatarUrl,
});


export const adaptFilmsToClient = (films: FilmShortDto[]): Film[] =>
  films
    .filter((film: FilmShortDto) => film.user !== null)
    .map((film: FilmShortDto) => ({
      id: film.id,
      name: film.name,
      posterImage: film.posterImage,
      backgroundImage: '',
      backgroundColor: '',
      videoLink: '',
      previewVideoLink: film.previewVideoLink,
      description: '',
      rating: 0,
      director: '',
      starring: [],
      runTime: 0,
      genre: film.genre,
      released: 0,
      isFavorite: film.isFavorite,
      user: adaptUserToClient(film.user),
    }));

export const adaptFilmToClient = (film: FilmDto): Film => ({
  id: film.id,
  name: film.name,
  posterImage: film.posterImage,
  backgroundImage: film.backgroundImage,
  backgroundColor: film.backgroundColor,
  videoLink: film.videoLink,
  previewVideoLink: film.previewVideoLink,
  description: film.description,
  rating: film.rating,
  director: film.director,
  starring: film.starring,
  runTime: film.runTime,
  genre: film.genre,
  released: film.released,
  isFavorite: film.isFavorite,
  user: adaptUserToClient(film.user),
});

export const adaptEditedFilmToClient = (film: UpdateFilmDto): Film => ({
  id: film.id,
  name: film.name,
  posterImage: film.posterImage,
  backgroundImage: film.backgroundImage,
  backgroundColor: film.backgroundColor,
  videoLink: film.videoLink,
  previewVideoLink: film.previewVideoLink,
  description: film.description,
  rating: film.rating,
  director: film.director,
  starring: film.starring,
  runTime: film.runTime,
  genre: film.genre,
  released: film.released,
  isFavorite: film.isFavorite,
  user: adaptUserToClient(film.user),
});

export const adaptCommentsToClient = (comments: CommentDto[]): Review[] =>
  comments
    .filter((comment: CommentDto) => comment.user !== null)
    .map((comment: CommentDto) => ({
      comment: comment.message,
      date: comment.postDate,
      id: comment.id,
      rating: comment.rating,
      user: adaptUserToClient(comment.user),
    }));

export const adaptCommentToClient = (comment: CommentDto): Review => ({
  comment: comment.message,
  rating: comment.rating,
  id: comment.id,
  user: adaptUserToClient(comment.user),
  date: comment.postDate,
});

