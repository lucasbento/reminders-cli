import 'babel-polyfill';

import yargs, { argv } from 'yargs';
import applescript from 'applescript';

yargs.usage('Command-line utility to handle reminders on Mac OSX.', {
  'list': {
    description: 'List all reminders that are not completed.',
    short: 'l',
  },
  'add': {
    description: 'Create a new reminder.',
    requiresArg: true,
    short: 'a'
  }
});

const showReminderList = async () => {
  applescript.execFile(`${__dirname}/scripts/get_reminders.applescript`, function(err, rtn) {
    if (err) {
      console.log(err);
      // Something went wrong!
    }
    console.log(rtn)
  });
};

const run = () => {
  if (argv.list || argv.l) {
    return showReminderList();
  }

  yargs.showHelp();
};

run();
