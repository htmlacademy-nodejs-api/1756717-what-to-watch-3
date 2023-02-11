import { inject, injectable } from 'inversify';
import { WatchlistServiceInterface } from './watchlist-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { WatchlistEntity } from './watchlist.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';

@injectable()
export default class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) { }

  public async create(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity>> {
    const result = await this.watchlistModel.findOne({ userId: userId });
    if (result) {
      await this.add(filmId, userId);
      return result;
    } else {
      const userWatchlist = await this.watchlistModel
        .create({
          filmIds: [filmId],
          userId: userId
        });
      this.logger.info(`Created watchlist for userId: ${userId}`);
      return userWatchlist;
    }
  }

  public async add(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null> {
    return await this.watchlistModel
      .findOneAndUpdate(
        {
          userId: userId
        },
        {
          $push: { filmIds: filmId }
        });

  }

  public async delete(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null> {
    return this.watchlistModel
      .findOneAndUpdate(
        {
          userId: userId
        },
        {
          $pull: { filmIds: filmId }
        });
  }

  public async findById(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null> {
    return this.watchlistModel
      .findOne({filmIds: filmId, userId: userId});
  }
}
