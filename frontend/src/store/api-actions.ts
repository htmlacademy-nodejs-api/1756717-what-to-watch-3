import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CreateFilm, Film } from '../types/film';
import { Review } from '../types/review';
import { NewReview } from '../types/new-review';
import { AuthData } from '../types/auth-data';
import { Token } from '../types/token';
import { APIRoute, DEFAULT_GENRE, HTTP_CODE, NameSpace } from '../const';
import { User } from '../types/user';
import { NewUser } from '../types/new-user';
import { dropToken, saveToken } from '../services/token';
import { adaptUserToClient, adaptCommentsToClient, adaptFilmsToClient, adaptFilmToClient, adaptLoginToClient, adaptCommentToClient } from '../utils/adapters/adaptersToClient';
import { adaptSignupToServer, adaptAvatarToServer, adaptCreateCommentToServer, adaptCreateFilmToServer, adaptImageToServer, adaptEditFilmToServer } from '../utils/adapters/adaptersToServer';
import FilmDto from '../dto/film/film.dto.js';
import CommentDto from '../dto/comment/comment.dto.js';
import UserDto from '../dto/user/user.dto.js';
import CreateUserWithIdDto from '../dto/user/create-user-with-id.dto.js';
import FilmShortDto from '../dto/film/film-short.dto.js';
import { capitalize } from '../util';

type Extra = {
  api: AxiosInstance;
};

export const fetchFilms = createAsyncThunk<Film[], undefined, { extra: Extra }>(
  `${NameSpace.Films}/fetchFilms`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmShortDto[]>(APIRoute.Films);

    return adaptFilmsToClient(data);
  }
);

export const fetchFilmsByGenre = createAsyncThunk<
  Film[],
  string,
  { extra: Extra }
>(`${NameSpace.Genre}/fetchFilmsByGenre`, async (genre, { extra }) => {
  const { api } = extra;
  let route = `${APIRoute.Genre}/?genre=${capitalize(genre)}`;
  if (genre === DEFAULT_GENRE) {
    route = APIRoute.Films;
  }
  const { data } = await api.get<FilmShortDto[]>(route);
  return adaptFilmsToClient(data);
});

export const fetchFilm = createAsyncThunk<Film, string, { extra: Extra }>(
  `${NameSpace.Film}/fetchFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmDto>(`${APIRoute.Films}/${id}`);

    return adaptFilmToClient(data);
  }
);

export const editFilm = createAsyncThunk<Film, Film, { extra: Extra }>(
  `${NameSpace.Film}/editFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const postData = await api.patch<FilmDto>(
      `${APIRoute.Films}/${filmData.id}`,
      adaptEditFilmToServer(filmData)
    );
    if (postData.status === HTTP_CODE.OK && filmData.imageStatus) {
      const postImageApiRoute = `${APIRoute.Films}/${filmData.id}/image`;

      await api.post(postImageApiRoute, adaptImageToServer(filmData.posterImage), {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    }
    const {data} = postData;
    return adaptFilmToClient(data);
  }
);

export const addFilm = createAsyncThunk<Film, CreateFilm, { extra: Extra }>(
  `${NameSpace.Film}/addFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const postData = await api.post<FilmDto>(APIRoute.Films, adaptCreateFilmToServer(filmData));

    if (postData.status === HTTP_CODE.CREATED && filmData.imageStatus) {
      const postImageApiRoute = `${APIRoute.Films}/${postData.data.id}/image`;

      await api.post(postImageApiRoute, adaptImageToServer(filmData.posterImage), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    const { data } = postData;
    return adaptFilmToClient(data);
  }
);

export const deleteFilm = createAsyncThunk<Film, string, { extra: Extra }>(
  `${NameSpace.Film}/deleteFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.delete<FilmDto>(`${APIRoute.Films}/${id}`);

    return adaptFilmToClient(data);
  }
);

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { extra: Extra }
>(`${NameSpace.Reviews}/fetchReviews`, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<CommentDto[]>(`${APIRoute.Films}/${id}/comments`);

  return adaptCommentsToClient(data);
});

export const postReview = createAsyncThunk<
  Review,
  { id: Review['id']; review: NewReview },
  { extra: Extra }
>(`${NameSpace.Reviews}/postReview`, async ({ id, review }, { extra }) => {
  const { api } = extra;
  const {data} = await api.post<CommentDto>(`${APIRoute.Comments}`, adaptCreateCommentToServer(review, id));

  return adaptCommentToClient(data);
});

export const checkAuth = createAsyncThunk<User, undefined, { extra: Extra }>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra }) => {
    const { api } = extra;
    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      dropToken();
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<User, AuthData, { extra: Extra }>(
  `${NameSpace.User}/login`,
  async (authData, { extra }) => {
    const { api } = extra;

    const { data } = await api.post<UserDto & { token: Token }>(
      APIRoute.Login,
      authData
    );
    const { token } = data;
    saveToken(token);

    return adaptLoginToClient(data);
  }
);

export const logout = createAsyncThunk<void, undefined, { extra: Extra }>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFavoriteFilms = createAsyncThunk<
  Film[],
  undefined,
  { extra: Extra }
>(`${NameSpace.FavoriteFilms}/fetchFavoriteFilms`, async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<FilmShortDto[]>(APIRoute.Favorite);

  return adaptFilmsToClient(data);
});

export const fetchPromo = createAsyncThunk<Film, undefined, { extra: Extra }>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmDto>(APIRoute.Promo);

    return adaptFilmToClient(data);
  }
);

export const setFavorite = createAsyncThunk<Film, Film['id'], { extra: Extra }>(
  `${NameSpace.FavoriteFilms}/setFavorite`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<FilmDto>(`${APIRoute.Favorite}/${id}`);

    return adaptFilmToClient(data);
  }
);

export const unsetFavorite = createAsyncThunk<
  Film,
  Film['id'],
  { extra: Extra }
>(`${NameSpace.FavoriteFilms}/unsetFavorite`, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.delete<FilmDto>(`${APIRoute.Favorite}/${id}`);

  return adaptFilmToClient(data);
});

export const registerUser = createAsyncThunk<void, NewUser, { extra: Extra }>(
  `${NameSpace.User}/register`,
  async (userData, { extra }) => {
    const { api } = extra;
    const postData = await api.post<CreateUserWithIdDto>(APIRoute.Register, adaptSignupToServer(userData));
    if (postData.status === HTTP_CODE.CREATED && userData.avatar) {
      const postAvatarApiRoute = `${APIRoute.Register}/${postData.data.id}/avatar`;

      await api.post(postAvatarApiRoute, adaptAvatarToServer(userData.avatar), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  }
);
