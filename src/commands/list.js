import applescript from 'applescript-promise';

const showReminderList = async () => {
  const res = await applescript.execFile(`${__dirname}/../scripts/get_reminders.applescript`);

  console.log('response', res);
};

export default showReminderList;
