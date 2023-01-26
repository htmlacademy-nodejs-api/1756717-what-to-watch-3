import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { FilmParams } from '../../types/film-params.type.js';
import { GenreParams } from '../../types/genre-params.type.js';
import UpdateFilmDto from './dto/update-film.dto.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:filmId', method: HttpMethod.Get, handler: this.findById});
    this.addRoute({path: '/:filmId', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/:filmId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/genres/:genre', method: HttpMethod.Get, handler: this.findByGenre});
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.findPromo});
    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.findFavorite});
  }

  public async index(
    req: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
      const limit = req.query?.limit;
      const films = await this.filmService.find(limit);
      const filmResponse = fillDTO(FilmResponse, films);
      this.ok(res, filmResponse);
    }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {

    const existFilm = await this.filmService.findByFilmName(body.name);

    if (existFilm) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Film with name «${body.name}» exists.`,
        'FilmController'
      );
    }

    const result = await this.filmService.create(body);
    this.created(res, fillDTO(FilmResponse, result)
    );
  }

  public async findById(req: Request, res: Response) {
    const { params: {filmId} } = req;
    console.log(filmId);

    const result = await this.filmService.findById(filmId);
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async update(
    req: Request<core.ParamsDictionary | FilmParams, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ) {
    const {body, params: { filmId }} = req;
    const result = await this.filmService.updateById(filmId, body);
    this.created(res, fillDTO(FilmResponse, result));
  }

  public async delete(req: Request, res: Response) {
    const {params: { filmId }} = req;
    await this.filmService.deleteById(filmId);
    this.noContent(res, {});
  }

  public async findByGenre(
    {params, query}: Request<core.ParamsDictionary | GenreParams, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const films = await this.filmService.findByGenre(params.genre, query.limit);
    const filmResponse = fillDTO(FilmResponse, films);
    this.ok(res, filmResponse);
  }

  public async findPromo(_req: Request, res: Response): Promise<void> {
    const result = await this.filmService.findPromo();
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async findFavorite(_req: Request, res: Response) {
    const result = await this.filmService.findFavorite();
    this.ok(res, fillDTO(FilmResponse, result));
  }
}
