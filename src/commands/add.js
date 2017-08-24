import applescript from 'applescript';

const addReminder = ({ date, time }) => {
  applescript.execFile(
    `${__dirname}/../scripts/add_reminder.applescript`,
    [ date, time ],
    (err, rtn) => {
    if (err) {
      console.log(err);
      // Something went wrong!
    }

    console.log(rtn)
  });
};

export default addReminder;
