import 'babel-polyfill';

import yargs, { argv } from 'yargs';

import { list, add } from './commands';

yargs.usage('Command-line utility to handle reminders on Mac OSX.', {
  'list': {
    description: 'List all reminders that are not completed.',
    short: 'l',
  },
  'add': {
    description: 'Create a new reminder.',
    requiresArg: true,
    short: 'a',
  },
});

const run = () => {
  if (argv.list || argv.l) {
    return list();
  }

  if (argv.add || argv.a) {
    return add({
      name: argv.add || argv.a,
      date: argv._[0], // TODO: figure out a better way to get date & time
      time: argv._[1],
    });
  }

  yargs.showHelp();
};

run();
