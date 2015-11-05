import './config/env';
import program from 'commander';
import {version} from '../package.json'; // eslint-disable-line import/named

program
  .version(version);

program
  .command('dictionary')
  .action(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.stdout.write('done\n');
  });

program.parse(process.argv);
