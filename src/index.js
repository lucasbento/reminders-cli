import 'babel-polyfill';

import meow from 'meow';

import { list, add, complete } from './commands';
import { updateNotifier, date } from './utils';

const cli = meow(`
  Usage
    $ remind <input>
    $ reminders

  Options
    --list      - List all reminders (will trigger if no option is provided).
    --complete  - List all reminders and enable a selector to be completed

  Examples
    $ remind me to feed the cats tomorrow at 12:00
    $ reminders --list
`);

const run = () => {
  if ((!cli.input.length && !Object.keys(cli.flags).length) || cli.flags.list) {
    return list();
  }

  if (cli.flags.complete) {
    return complete((typeof cli.flags.complete !== 'boolean') && cli.flags.complete);
  }

  const phrase = cli.input.join(' ');

  const parsedPhrase = date.parsePhrase(phrase);

  if (!parsedPhrase) {
    return add();
  }

  return add({
    name: parsedPhrase.name,
    date: parsedPhrase.startDate,
    time: parsedPhrase.startTime,
    startDateTime: parsedPhrase.startDateTime
  });
};

updateNotifier();
run();
