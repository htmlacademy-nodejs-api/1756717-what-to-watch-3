import 'reflect-metadata';
import { Container } from 'inversify';
import { applicationContainer } from './app/application.container.js';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import { userContainer } from './modules/user/user.container.js';
import { filmContainer } from './modules/film/film.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import { watchlistContainer } from './modules/watchlist/watchlist.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    applicationContainer,
    userContainer,
    filmContainer,
    commentContainer,
    watchlistContainer
  );
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
