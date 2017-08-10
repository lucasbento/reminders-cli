import 'babel-polyfill';
import runApplescript from 'run-applescript';
import applescript from 'applescript';

const handleReminder = async () => {
  applescript.execFile(`${__dirname}/scripts/get_reminders.applescript`, function(err, rtn) {
    if (err) {
      console.log(err);
      // Something went wrong!
    }
    console.log(rtn)
  });
};

handleReminder();