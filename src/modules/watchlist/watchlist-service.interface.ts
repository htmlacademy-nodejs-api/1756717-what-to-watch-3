import { DocumentType } from '@typegoose/typegoose';
import { WatchlistEntity } from './watchlist.entity.js';

export interface WatchlistServiceInterface {
  create(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity>>;
  add(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null>;
  delete(filmId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null>;
  findById(filmId: string): Promise<DocumentType<WatchlistEntity> | null>;
}
