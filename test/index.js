import {
  addReminder,
  clearReminders,
} from './helper';

console.log = () => {};

beforeEach(async () => {
  await addReminder();
});

afterEach(async () => {
  await clearReminders();
});
