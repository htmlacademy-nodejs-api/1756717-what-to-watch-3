import { LoggerInterface } from '../common/logger/logger.interface.js';

export default class Application {
  constructor(private logger: LoggerInterface) {}

  public async init() {
    this.logger.info('Application initialization...');
  }
}
