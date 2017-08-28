import applescript from 'applescript-promise';
import chalk from 'chalk';
import ora from 'ora';

const tic = chalk.green('✓');
const tac = chalk.red('✗');

const spinner = ora();

const addReminder = async ({ name, date, time }) => {
  spinner.start();

  spinner.text = 'Adding a new reminder...';

  const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

  try {
    await applescript.execFile(scriptPath, [ name, date, time ]);

    spinner.stop();

    console.log(`${tic} Reminder added successfully!`);
  } catch (err) {
    spinner.stop();

    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

export default addReminder;
