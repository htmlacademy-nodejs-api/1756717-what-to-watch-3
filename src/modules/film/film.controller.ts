import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import ShortFilmResponse from './response/short-film.response.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { ParamsGetFilm } from '../../types/params-get-film.type.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { WatchlistServiceInterface } from '../watchlist/watchlist-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import UploadImageResponse from './response/upload-image.response.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFilmDto)
      ]
    });
    this.addRoute({ path: '/promo', method: HttpMethod.Get, handler: this.getPromo });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorite,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/favorite/:filmId/:status',
      method: HttpMethod.Post,
      handler: this.changeFavoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index(
    req: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const { query, user } = req;
    const limit = Number(query?.limit) || undefined;
    let films;
    if (query.genre) {
      films = await this.filmService.findByGenre(query.genre, limit, user?.id);
    } else {
      films = await this.filmService.find(limit, user?.id);
    }
    this.ok(res, fillDTO(ShortFilmResponse, films));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {

    const { body, user } = req;
    const existFilm = await this.filmService.findByFilmName(body.name);

    if (existFilm) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Film with name «${body.name}» exists.`,
        'FilmController'
      );
    }

    const result = await this.filmService.create({ ...body, userId: user.id });
    const film = await this.filmService.findById(result.id);
    this.created(res, fillDTO(FilmResponse, film)
    );
  }

  public async show(
    req: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const { params, user } = req;
    const { filmId } = params;

    const film = await this.filmService.findById(filmId, user?.id);

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async update(
    { body, params, user }: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {

    const film = await this.filmService.findById(params.filmId);
    if (film?.userId?._id.toString() !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User don't have root to change film (id: ${params.filmId})`,
        'FilmController'
      );
    }
    const updatedFilm = await this.filmService.updateById(params.filmId, body);

    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  public async delete(
    { params, user }: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {

    const film = await this.filmService.findById(params.filmId);
    if (film?.userId?._id.toString() !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User don't have root to change film (id: ${params.filmId})`,
        'FilmController'
      );
    }

    await this.commentService.deleteByFilmId(params.filmId);

    const deletedFilm = await this.filmService.deleteById(params.filmId);

    this.noContent(res, deletedFilm);
  }

  public async getPromo(req: Request, res: Response): Promise<void> {
    const { user } = req;
    const result = await this.filmService.findPromo(user?.id);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Promo film is not found',
        'FilmController'
      );
    }
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async getFavorite(req: Request, res: Response) {
    const { user } = req;
    let result = await this.filmService.findFavorite(user.id);
    if (!result) {
      result = [];
    }
    this.ok(res, fillDTO(ShortFilmResponse, result));
  }

  public async getComments(
    { params }: Request<core.ParamsDictionary | ParamsGetFilm, object, object>,
    res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByFilmId(params.filmId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async changeFavoriteStatus(
    req: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const { params, user } = req;
    const film = await this.filmService.changeFavoriteStatus(params.filmId, Number(params.status));
    if (params.status && Number(params.status) === 1) {
      const favorite = await this.watchlistService.findById(params.filmId, user.id);
      if (favorite) {
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          `Film ${params.filmId}) is already favorite`,
          'FilmController'
        );
      }
      await this.watchlistService.create(params.filmId, user.id);
    } else {
      await this.watchlistService.delete(params.filmId, user.id);
    }
    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async uploadImage(req: Request<core.ParamsDictionary | ParamsGetFilm>, res: Response) {
    const {filmId} = req.params;
    const updateDto = { posterImage: req.file?.filename };
    await this.filmService.updateById(filmId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }
}
