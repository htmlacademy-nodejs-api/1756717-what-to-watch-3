export const DEFAULT_FILM_COUNT = 60;

export const filmValidationMessages = {
  NAME: 'Min length is 2, max length is 100',
  DESCRIPTION: 'Min length is 20, max length is 1024',
  POSTDATE: 'postDate must be valid ISO date',
  GENRE: 'Genre must be comedy, crime, documentary, drama, horror, family, romance, scifi or thriller',
  STARRING: 'Field starring must be an array',
  DIRECTOR: 'Min length is 2, max length is 50',
  USER: 'userId field must be a valid id',
  POSTER: 'posterImage field must be a link on .jpg format',
  BACKGROUND_IMAGE: 'backgroundImage field must be a link on .jpg format',
};

export const filmRequiredMessages = {
  NAME: 'name is required',
  DESCRIPTION: 'description is required',
  POSTDATE: 'postDate is required',
  GENRE: 'genre is required',
  RELEASED: 'released is required',
  PREVIEW_VIDEO: 'previewVideoLink is required',
  VIDEO: 'videoLink is required',
  DIRECTOR: 'director is required',
  RUNTIME: 'runTime is required',
  USER: 'userId is required',
  BACKGROUND_IMAGE: 'backgroundImage is required',
  BACKGROUND_COLOR: 'backgroundColor is required',
};

export const nameLength = {
  MIN: 2,
  MAX: 100,
};

export const descriptionLength = {
  MIN: 20,
  MAX: 1024,
};

export const directorLength = {
  MIN: 2,
  MAX: 50,
};
