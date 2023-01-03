import { ConfigInterface } from './config.interface.js';
import { config, DotenvParseOutput } from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';

export default class ConfigService implements ConfigInterface {
  private config: DotenvParseOutput;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exist.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env file found and succesfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
