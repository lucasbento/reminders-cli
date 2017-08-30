import applescript from 'applescript-promise';
import ora from 'ora';
import inquirer from 'inquirer';
import moment from 'moment';
import chalk from 'chalk';

const getRemindersPath = `${__dirname}/../scripts/get_reminders.applescript`;
const updateReminderPath = `${__dirname}/../scripts/update_reminder.applescript`;
const getReminderPath = `${__dirname}/../scripts/get_reminder.applescript`;

const spinner = ora();

const dateFormat = 'dddd, D MMMM YYYY H:mm:ss';

const showReminderList = async () => {
  spinner.start();

  spinner.text = 'Loading reminders';

  const reminders = await applescript.execFile(getRemindersPath);

  spinner.stop();

  const reminderList = [
    {
      type: 'list',
      name: 'name',
      message: 'Reminders',
      choices: reminders,
    },
  ];

  const chosenReminder = await inquirer.prompt(reminderList);

  spinner.start();

  spinner.text = 'Loading reminder information';

  const reminderInfo = await applescript.execFile(getReminderPath, [chosenReminder.name]);
  const reminderDate = moment(reminderInfo, dateFormat);

  spinner.stop();

  // eslint-disable-next-line global-require
  inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name?',
      default: chosenReminder.name,
      validate: name => !!name,
    }, {
      type: 'datetime',
      name: 'date',
      message: 'Date?',
      default: new Date(reminderDate.toISOString()),
      format: ['dd', '/', 'mm', '/', 'yyyy'],
    }, {
      type: 'datetime',
      name: 'time',
      message: 'Time?',
      default: new Date(reminderDate.toISOString()),
      format: ['HH', ':', 'MM'],
      time: {
        minutes: {
          interval: 10,
        },
      },
    },
  ];

  const response = await inquirer.prompt(questions);

  updateReminder(chosenReminder.name, response);
};

const updateReminder = async (reminderName, { name, date, time }) => {
  spinner.start();
  spinner.text = 'Updating reminder';

  const datetime = moment(`${date} ${time}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
  const args = [
    reminderName,
    name,
    datetime,
  ];

  try {
    await applescript.execFile(updateReminderPath, args);

    spinner.stop();

    console.log(`${chalk.green('✓')} Reminder ${name} updated!`);
  } catch (err) {
    spinner.stop();

    console.log(`${chalk.red('✗')} There was an error while trying to update reminder. 😕`);
  }
};

export default showReminderList;
