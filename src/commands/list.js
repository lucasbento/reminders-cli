import applescript from 'applescript-promise';
import inquirer from 'inquirer';
import format from 'date-fns/format';

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
  const reminderDate = await applescript.execFile(getReminderPath, [name]);
  const formattedReminderDate = format(reminderDate, 'DD/MM/YYYY-HH:mm').split('-');

  const questions = [{
    type: 'input',
    name: 'name',
    message: 'What\'s the name of the reminder?',
    default: name,
  }, {
    type: 'input',
    name: 'date',
    message: 'What\'s the due date of the reminder?',
    default: formattedReminderDate[0],
  }, {
    type: 'input',
    name: 'time',
    message: 'What\'s the time of the reminder?',
    default: formattedReminderDate[1],
  }];

  const response = await inquirer.prompt(questions);
  const args = Object.values(response);

  const reminder = await applescript.execFile(updateReminderPath, args);

  console.log('rem:', reminder);
};

export default showReminderList;
