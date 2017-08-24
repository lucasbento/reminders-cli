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

const addReminder = ({ date, time }) => {
  applescript.execFile(`${__dirname}/scripts/add_reminder.applescript`, [ date, time ], function(err, rtn) {
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

  if (argv.add || argv.a) {
    return addReminder({
      date: argv.add || argv.a,
      time: argv._[0], // TODO: figure out a better way to get time
    });
  }

  yargs.showHelp();
};

run();
