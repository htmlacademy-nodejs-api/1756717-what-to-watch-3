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
import { WatchlistEntity } from '../watchlist/watchlist.entity.js';
import { Types } from 'mongoose';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>,
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) { }

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string, userId?: string): Promise<DocumentType<FilmEntity> | null> {
    const favoriteFilms = userId ? await this.watchlistModel
      .findOne({ userId })
      .select('filmIds')
      .exec() : null;
    const favorites = favoriteFilms?.filmIds || [];
    return this.filmModel
      .aggregate([
        {
          $match: { _id: Types.ObjectId.createFromHexString(filmId) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $addFields: {
            isFavorite: {
              $in: ['$_id', favorites]
            },
            userId: '$user',
            id: { $toString: '$_id' }
          }
        }
      ])
      .exec()
      .then((res) => res[0]);
  }

  public async findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findOne({ name: filmName })
      .exec();
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;
    const favoriteFilms = userId ? await this.watchlistModel
      .findOne({ userId })
      .select('filmIds')
      .exec() : null;
    const favorites = favoriteFilms?.filmIds || [];
    return this.filmModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $limit: limit
        },
        {
          $addFields: {
            isFavorite: {
              $in: ['$_id', favorites]
            },
            userId: '$user',
            id: { $toString: '$_id' }
          }
        },
        {
          $sort: { postDate: SortType.Down }
        }
      ])
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

  public async findByGenre(genre: GenreType, count?: number, userId?: string): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;
    const favoriteFilms = userId ? await this.watchlistModel
      .findOne({ userId })
      .select('filmIds')
      .exec() : null;
    const favorites = favoriteFilms?.filmIds || [];
    return this.filmModel
      .aggregate([
        {
          $match: { genre }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $limit: limit
        },
        {
          $addFields: {
            isFavorite: {
              $in: ['$_id', favorites]
            },
            userId: '$user',
            id: { $toString: '$_id' }
          }
        },
        {
          $sort: { postDate: SortType.Down }
        }
      ])
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

  public async findPromo(userId?: string): Promise<DocumentType<FilmEntity> | null> {
    const favoriteFilms = userId ? await this.watchlistModel
      .findOne({ userId })
      .select('filmIds')
      .exec() : null;
    const favorites = favoriteFilms?.filmIds || [];
    return this.filmModel
      .aggregate([
        {
          $match: { isPromo: true }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $addFields: {
            isFavorite: {
              $in: ['$_id', favorites]
            },
            userId: '$user',
            id: { $toString: '$_id' }
          }
        }
      ])
      .exec()
      .then((res) => res[0]);
  }

  public async findFavorite(userId: string): Promise<DocumentType<FilmEntity>[] | null> {
    const favoriteFilms = await this.watchlistModel
      .findOne({ userId })
      .select('filmIds')
      .exec();
    if (!favoriteFilms?.filmIds) {
      return null;
    }
    return this.filmModel
      .aggregate([
        {
          $match: { _id: { $in: favoriteFilms.filmIds } }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $addFields: {
            userId: '$user',
            id: { $toString: '$_id' }
          }
        }
      ]);
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
    const newRating = Number(((rating + oldRating * (ratingsCount - 1)) / ratingsCount).toFixed(1));

    return await this.updateById(
      filmId,
      {
        rating: newRating
      });
  }
}
