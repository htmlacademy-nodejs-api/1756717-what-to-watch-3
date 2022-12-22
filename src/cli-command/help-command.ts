import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.yellow('Программа для подготовки данных для REST API сервера.')}

      ${chalk.yellow('Пример:')}
          ${chalk.green.bold('cli.js --<command> [--arguments]')}

      ${chalk.yellow('Команды:')}

          ${chalk.green.bold('--version:')}                   ${chalk.blue('# выводит номер версии')}
          ${chalk.green.bold('--help:')}                      ${chalk.blue('# печатает этот текст')}
          ${chalk.green.bold('--import <path>:')}             ${chalk.blue('# импортирует данные из TSV')}
          ${chalk.green.bold('--generate <n> <path> <url>')}  ${chalk.blue('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
