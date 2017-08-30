import applescript from 'applescript-promise';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import moment from 'moment';

const tic = chalk.green('✓');
const tac = chalk.red('✗');

const spinner = ora();

const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const addReminder = async (providedArgs) => {
  let info = providedArgs;
  const questions = [];
  if (!providedArgs.name) {
    questions.push(
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of the reminder?',
        validate: name => !!name,
      },
    );
  } else {
    console.log(`${tic} Creating ${info.name}...`);
  }

  if (!providedArgs.date) {
    questions.push(
      {
        type: 'datetime',
        name: 'date',
        message: 'What\'s the due date of the reminder?',
        format: ['dd', '/', 'mm', '/', 'yyyy'],
      },
    );
  }

  if (!providedArgs.time) {
    questions.push(
      {
        type: 'datetime',
        name: 'time',
        message: 'What\'s the time of the reminder?',
        format: ['HH', ':', 'MM'],
        time: {
          minutes: {
            interval: 10,
          },
        },
      },
    );
  }

  if (questions.length) {
    const response = await inquirer.prompt(questions);

    if (response.date) {
      response.date = moment(response.date).format('DD/MM/YYYY');
    }

    if (response.time) {
      response.time = moment(response.time).format('HH:mm');
    }

    info = {
      ...info,
      ...response,
    };
  }

  spinner.start();

  spinner.text = 'Creating the new reminder...';

  try {
    console.log('args:', info)
    await applescript.execFile(scriptPath, Object.values(info));

    spinner.stop();

    console.log(`${tic} Reminder added successfully!`);
  } catch (err) {
    spinner.stop();

    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

export default addReminder;
