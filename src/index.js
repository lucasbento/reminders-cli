import 'babel-polyfill';

import yargs, { argv } from 'yargs';

import { list, add, complete } from './commands';
import { updateNotifier } from './utils';
import pkg from '../package.json';

yargs.usage('Command-line utility to handle reminders on Mac OSX', {
  list: {
    description: 'List all reminders that are not completed',
    short: 'l',
  },
  add: {
    description: 'Create a new reminder',
    short: 'a',
  },
  complete: {
    description: 'Complete a reminder',
    short: 'c',
  },
  version: {
    description: 'Package version',
    short: 'v',
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

  if (argv.complete || argv.c) {
    let name = null;
    if (typeof argv.complete !== 'boolean' && typeof argv.c !== 'boolean') {
      name = argv.complete || argv.c;
    }

    return complete(name);
  }

  if (argv.version || argv.v) {
    return console.log(`${pkg.name} version ${pkg.version}`);
  }

  return yargs.showHelp();
};

updateNotifier();
run();
