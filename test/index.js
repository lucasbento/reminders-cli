import { clearReminders } from './helper';
import inquirer from '../src/__mocks__/inquirer';

// eslint-disable-next-line no-undef
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

if (process.env.NODE_ENV === 'CI') {
  console.log = () => {};
}

afterEach(async () => {
  inquirer.resetPrompts();

  await clearReminders();
});
