import applescript from 'applescript-promise';
import ora from 'ora';
import inquirer from 'inquirer';
import moment from 'moment';
import chalk from 'chalk';
import { DateRange } from '../utils';

const getRemindersPath = `${__dirname}/../scripts/get_reminders.applescript`;
const updateReminderPath = `${__dirname}/../scripts/update_reminder.applescript`;
const getReminderPath = `${__dirname}/../scripts/get_reminder.applescript`;

const spinner = ora();

export const getReminders = () => applescript.execFile(getRemindersPath);
export const getReminderDate = async ({ name }) => {
  const date = await applescript.execFile(getReminderPath, [name]);

  return moment(date, 'dddd, D MMMM YYYY H:mm:ss').format('DD/MM/YYYY-HH:mm').split('-');
};

const showReminderList = async () => {
  spinner.start();

  spinner.text = 'Loading reminders';

  const reminders = await getReminders();

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

  const reminderDate = await getReminderDate(chosenReminder);

  spinner.stop();

  const dateRange = new DateRange(reminderDate[0]);
  const choices = dateRange.getDateChoices();

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the name of the reminder?',
      default: chosenReminder.name,
    }, {
      type: 'list',
      name: 'date',
      message: 'What\'s the due date of the reminder?',
      choices,
      filter: date => dateRange.getDateValueBasedOnLabel(date).value,
    }, {
      type: 'input',
      name: 'date',
      message: 'What\'s the due date of the reminder?',
      when: ({ date }) => dateRange.checkIsCustomDate(date),
    }, {
      type: 'input',
      name: 'time',
      message: 'What\'s the time of the reminder?',
      default: reminderDate[1],
    },
  ];

  const response = await inquirer.prompt(questions);

  updateReminder(chosenReminder.name, response);
};

export const updateReminder = async (reminderName, { name, date, time }) => {
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
