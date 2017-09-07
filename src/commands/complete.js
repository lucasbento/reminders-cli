import applescript from 'applescript-promise';
import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { getReminders } from './list';

const completeReminderPath = `${__dirname}/../scripts/complete_reminder.applescript`;

const spinner = ora();

export const completeReminder = async ({ name }) => {
  spinner.start('Completing reminder...');

  try {
    await applescript.execFile(completeReminderPath, [name]);

    spinner.stop();

    console.log(`${chalk.green('✓')} Reminder ${name} completed!`);
  } catch (err) {
    spinner.stop();

    console.log(`${chalk.red('✗')} There was an error while trying to complete the reminder. 😕`);
  }
};

export default async () => {
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

  const chosenReminder = await inquirer.prompt(reminderList);

  completeReminder(chosenReminder);
};
