import { MockData } from '../../types/mock-data.type.js';
import { GenreType } from '../../types/genre-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';
import { FilmReleaseYearSettings, RatingSettings, RunTimeSettings, CommentAmountSettings, DateSettings } from '../../utils/random-settings.js';
import dayjs from 'dayjs';


export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(DateSettings.FIRST_WEEK_DAY, DateSettings.LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem<string>(Object.keys(GenreType));
    const released = generateRandomValue(FilmReleaseYearSettings.MIN, FilmReleaseYearSettings.MAX).toString();
    const rating = generateRandomValue(RatingSettings.MIN, RatingSettings.MAX, RatingSettings.NUM_AFTER_DIGIT).toString();
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLinks);
    const videoLink = getRandomItem<string>(this.mockData.videoLinks);
    const starring = getRandomItems<string>(this.mockData.actors).join(', ');
    const director = getRandomItem<string>(this.mockData.directors);
    const runTime = generateRandomValue(RunTimeSettings.MIN, RunTimeSettings.MAX).toString();
    const commentsAmount = generateRandomValue(CommentAmountSettings.MIN, CommentAmountSettings.MAX).toString();
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);

    return [
      name, description, createdDate,
      genre, released, rating,
      previewVideoLink, videoLink,
      starring, director, runTime,
      commentsAmount, userName,
      email, avatarUrl, posterImage,
      backgroundImage, backgroundColor,
    ].join('\t');
  }
}
