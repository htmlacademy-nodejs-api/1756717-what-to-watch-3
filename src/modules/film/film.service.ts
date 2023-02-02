import { inject, injectable } from 'inversify';
import { FilmServiceInterface } from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FilmEntity } from './film.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DEFAULT_FILM_COUNT } from './film.constant.js';
import { SortType } from '../../types/sort-type.enum.js';
import { GenreType } from '../../types/genre-type.enum.js';
import { ConfigInterface } from '../../common/config/config.interface.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) { }

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate('userId')
      .exec();
  }

  public async findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findOne({ name: filmName })
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel
      .find({}, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async findByGenre(genre: GenreType, count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;
    return this.filmModel
      .find({ genre }, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {
        '$inc': {
          commentsAmount: 1,
        }
      }).exec();
  }

  public async findPromo(): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findOne({ _id: this.configService.get('PROMO_ID') })
      .populate('userId')
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .populate('userId')
      .exec();
  }

  public async changeFavoriteStatus(filmId: string, status: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {
        '$set': {
          isFavorite: status,
        }
      }, { new: true })
      .populate('userId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel
      .exists({ _id: documentId })) !== null;
  }

  public async countRating(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null> {
    const movie = await this.findById(filmId);
    const oldRating = movie?.rating ?? 0;
    const ratingsCount = movie?.commentsAmount ?? 0;
    const newRating = Number(((rating + oldRating * ratingsCount) / (ratingsCount + 1)).toFixed(1));

    return await this.updateById(
      filmId,
      {
        rating: newRating
      });
  }
}
