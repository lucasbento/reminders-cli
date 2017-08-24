import applescript from 'applescript';

const showReminderList = async () => {
  applescript.execFile(`${__dirname}/../scripts/get_reminders.applescript`, function(err, rtn) {
    if (err) {
      console.log(err);
      // Something went wrong!
    }
    console.log(rtn)
  });
};

export default showReminderList;
