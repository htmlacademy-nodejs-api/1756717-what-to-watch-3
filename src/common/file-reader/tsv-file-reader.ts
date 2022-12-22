import { readFileSync } from 'fs';
import { GenreType } from '../../types/genre-type.enum.js';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
      ]) => ({
        name,
        description,
        postDate: new Date(createdDate),
        genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'Scifi' | 'Thriller' ],
        released: Number(released),
        rating: Number(rating),
        previewVideoLink,
        videoLink,
        starring: starring.split(', ')
          .map((actor) => (actor)),
        director,
        runTime: Number(runTime),
        commentsAmount: Number(commentsAmount),
        user: {userName, email, avatarUrl},
        posterImage,
        backgroundImage,
        backgroundColor,
      }));
  }
}
