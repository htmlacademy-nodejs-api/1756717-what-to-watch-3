import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { GenreType } from './const';
dayjs.extend(duration);

export const getRatingText = (rating: number) => {
  switch (true) {
    case rating >= 0 && rating < 3:
      return 'Bad';
    case rating >= 3 && rating < 5:
      return 'Normal';
    case rating >= 5 && rating < 8:
      return 'Good';
    case rating >= 8 && rating < 10:
      return 'Very good';
    case rating >= 10:
      return 'Awesome';
  }
};

export const formatRunTime = (runTime: number) => {
  const runTimeAsDuration = dayjs.duration(runTime, 'm');
  return runTime > 59
    ? runTimeAsDuration.format('H[h] mm[m]')
    : runTimeAsDuration.format('mm[m]');
};

export const formatReviewDate = (date: string) => dayjs(date).format('MMMM D, YYYY');

export const formatRemainingTime = (remainingTime: number): string => {
  const remainingTimeAsDuration = dayjs.duration(remainingTime, 'seconds');
  return remainingTime >= 3600
    ? remainingTimeAsDuration.format('-HH:mm:ss')
    : remainingTimeAsDuration.format('-mm:ss');
};

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const getTime = () => {
  const now = new Date();
  return now.toISOString();
};

export const checkGenre = (genre: string) => {
  switch (genre) {
    case GenreType.Comedy:
      return GenreType.Comedy;
    case GenreType.Crime:
      return GenreType.Crime;
    case GenreType.Documentary:
      return GenreType.Documentary;
    case GenreType.Drama:
      return GenreType.Drama;
    case GenreType.Family:
      return GenreType.Family;
    case GenreType.Horror:
      return GenreType.Horror;
    case GenreType.Romance:
      return GenreType.Romance;
    case GenreType.Scifi:
      return GenreType.Scifi;
    case GenreType.Thriller:
      return GenreType.Thriller;
    default:
      return GenreType.Drama;
  }
};
