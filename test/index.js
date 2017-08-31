import { clearReminders } from './helper';
import inquirer from '../src/__mocks__/inquirer';

if (process.env.NODE_ENV === 'CI') {
  console.log = () => {};
}

afterEach(async () => {
  inquirer.resetPrompts();

  await clearReminders();
});
