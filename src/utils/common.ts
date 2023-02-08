import * as jose from 'jose';
import crypto from 'crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { GenreType } from '../types/genre-type.enum.js';
import { Film } from '../types/film.type.js';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { UnknownObject } from '../types/unknown-object.type.js';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [
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
  ] = tokens;
  return {
    name,
    description,
    postDate: new Date(createdDate),
    genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'Scifi' | 'Thriller'],
    released: Number(released),
    rating: Number(rating),
    previewVideoLink,
    videoLink,
    starring: starring.split(', ')
      .map((actor) => (actor)),
    director,
    runTime: Number(runTime),
    commentsAmount: Number(commentsAmount),
    user: { userName, email, avatarUrl },
    posterImage,
    backgroundImage,
    backgroundColor,
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algoritm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};
