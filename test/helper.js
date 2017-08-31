import applescript from 'applescript-promise';
import moment from 'moment';

const addReminderPath = `${__dirname}/scripts/add_reminder.applescript`;
const clearRemindersPath = `${__dirname}/scripts/clear_reminders.applescript`;

export const REMINDER_NAME = 'Generated reminder for testing';
export const NUMBER_DAYS_REMINDER_DATE = 2;
export const REMINDER_HOUR = 10;

export const addReminder = async () => {
  try {
    await applescript.execFile(addReminderPath, [REMINDER_NAME, NUMBER_DAYS_REMINDER_DATE, REMINDER_HOUR]);

    return {
      name: REMINDER_NAME,
      date: moment().add(NUMBER_DAYS_REMINDER_DATE, 'days'),
      error: null,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export const clearReminders = async () => {
  try {
    await applescript.execFile(clearRemindersPath, [REMINDER_NAME]);

    return {
      error: null,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
