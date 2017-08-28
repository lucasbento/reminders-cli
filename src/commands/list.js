import applescript from 'applescript-promise';
import inquirer from 'inquirer';

import Renderer from '../renderer';

const renderer = new Renderer();

const getRemindersPath = `${__dirname}/../scripts/get_reminders.applescript`;
const updateReminderPath = `${__dirname}/../scripts/update_reminder.applescript`;
const getReminderPath = `${__dirname}/../scripts/get_reminder.applescript`;

const showReminderList = async () => {
  renderer.showLoading('Loading reminders');

  const reminders = await applescript.execFile(getRemindersPath);

  renderer.stopLoading();

  renderer.render(reminders);

  renderer.list.on('select', ({ content }) => {
    renderer.destroy();

    handleUpdateReminder(content);
  });
};

const handleUpdateReminder = async (name) => {
  const reminder = await applescript.execFile(getReminderPath, [name]);

  console.log('rem', reminder)

  // const questions = [{
  //   type: 'input',
  //   name: 'name',
  //   message: 'What\'s the name of the reminder?',
  //   default: name,
  // }, {
  //   type: 'input',
  //   name: 'date',
  //   message: 'What\'s the due date of the reminder?',
  // }, {
  //   type: 'input',
  //   name: 'time',
  //   message: 'What\'s the time of the reminder?',
  // }];
  //
  // const response = await inquirer.prompt(questions);
  //
  // console.log('res:', response);
  // const reminder = await applescript.execFile(updateReminderPath, [name]);
  //
  // console.log('rem:', reminder);
};

export default showReminderList;
