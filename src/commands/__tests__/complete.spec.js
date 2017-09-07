import inquirer from '../../__mocks__/inquirer';
import complete, { completeReminder } from '../complete';
import { getReminders } from '../list';
import {
  addReminder,
  REMINDER_NAME,
} from '../../../test/helper';

beforeEach(async () => {
  await addReminder();
});

it('should list the reminders', async () => {
  await complete();

  const prompts = inquirer.getPrompts();

  expect(prompts[0].name).toEqual('name');
  expect(prompts[0].choices).toEqual(expect.arrayContaining([REMINDER_NAME]));
});

it('should complete reminder with exact name', async () => {
  await completeReminder(REMINDER_NAME);

  const reminders = await getReminders();

  expect(reminders).not.toEqual(expect.arrayContaining([REMINDER_NAME]));
});

it('should complete reminder with part of name', async () => {
  await completeReminder(REMINDER_NAME.slice(4, 9), true);

  const reminders = await getReminders();

  expect(reminders).not.toEqual(expect.arrayContaining([REMINDER_NAME]));
});
