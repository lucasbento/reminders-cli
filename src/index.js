import 'babel-polyfill';

import yargs, { argv } from 'yargs';

import { list, add } from './commands';

yargs.usage('Command-line utility to handle reminders on Mac OSX.', {
  list: {
    description: 'List all reminders that are not completed.',
    short: 'l',
  },
  add: {
    description: 'Create a new reminder.',
    short: 'a',
  },
});

const run = () => {
  if (argv.list || argv.l) {
    return list();
  }

  if (argv.add || argv.a) {
    let name = null;
    if (typeof argv.add !== 'boolean' && typeof argv.a !== 'boolean') {
      name = argv.add || argv.a;
    }

    return add({
      name,
      date: argv._[0], // TODO: figure out a better way to get date & time
      time: argv._[1],
    });
  }

  return yargs.showHelp();
};

run();
