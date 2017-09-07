import applescript from 'applescript-promise';
import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { getReminders } from './list';

const completeReminderPath = `${__dirname}/../scripts/complete_reminder.applescript`;

const spinner = ora();

export const completeReminder = async (name, isSearch) => {
  spinner.start('Completing reminder...');

  try {
    await applescript.execFile(completeReminderPath, [name]);

    spinner.stop();

    if (isSearch) {
      return console.log(`${chalk.green('✓')} Reminders matching "${name}" have been completed!`);
    }

    return console.log(`${chalk.green('✓')} Reminder ${name} completed!`);
  } catch (err) {
    spinner.stop();

    return console.log(`${chalk.red('✗')} There was an error while trying to complete the reminder. 😕`);
  }
};

export default async (name = null) => {
  if (name) {
    return completeReminder(name, true);
  }

  spinner.start('Loading reminders');

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

  const { name: reminderName } = await inquirer.prompt(reminderList);

  return completeReminder(reminderName);
};
