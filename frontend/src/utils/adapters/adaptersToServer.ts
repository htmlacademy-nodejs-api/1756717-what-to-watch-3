import CreateCommentDto from '../../dto/comment/create-comment.dto.js';
import CreateFilmDto from '../../dto/film/create-film.dto.js';
import UpdateFilmDto from '../../dto/film/update-film.dto.js';
import CreateUserDto from '../../dto/user/create-user.dto.js';
import UserDto from '../../dto/user/user.dto.js';
import { Film } from '../../types/film.js';
import { NewFilm } from '../../types/new-film.js';
import { NewReview } from '../../types/new-review.js';
import { NewUser } from '../../types/new-user.js';
import { User } from '../../types/user.js';
import { checkGenre, getTime } from '../../util';

export const adaptSignupToServer = (user: NewUser): CreateUserDto => ({
  userName: user.name,
  email: user.email,
  avatarUrl: user.avatar,
  password: user.password,
});

export const adaptUserToServer = (user: User): UserDto => ({
  userName: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
});

export const adaptCreateFilmToServer = (film: NewFilm): CreateFilmDto => ({
  name: film.name,
  description: film.description,
  postDate: getTime(),
  posterImage: film.posterImage,
  genre: checkGenre(film.genre),
  released: film.released,
  previewVideoLink: film.previewVideoLink,
  videoLink: film.videoLink,
  starring: film.starring,
  director: film.director,
  runTime: film.runTime,
  backgroundImage: film.backgroundImage,
  backgroundColor: film.backgroundColor,
});

export const adaptEditFilmToServer = (film: Film): UpdateFilmDto => ({
  id: film.id,
  name: film.name,
  description: film.description,
  posterImage: '',
  genre: checkGenre(film.genre),
  rating: film.rating,
  released: film.released,
  previewVideoLink: film.previewVideoLink,
  videoLink: film.videoLink,
  starring: film.starring,
  director: film.director,
  runTime: film.runTime,
  backgroundImage: film.backgroundImage,
  backgroundColor: film.backgroundColor,
  isFavorite: film.isFavorite,
  user: adaptUserToServer(film.user),
});

export const adaptCreateCommentToServer = (comment: NewReview, id: string): CreateCommentDto => ({
  message: comment.comment,
  rating: comment.rating,
  postDate: getTime(),
  filmId: id,
});

export const adaptAvatarToServer = (file: File) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};

export const adaptImageToServer = (file: string) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};
