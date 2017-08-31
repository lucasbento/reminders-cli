import inquirer from '../../__mocks__/inquirer';
import add from '../add';
import { getReminders } from '../list';
import { REMINDER_NAME } from '../../../test/helper';

it('should handle the add command', async () => {
  await add();

  const prompts = inquirer.getPrompts();

  const reminders = await getReminders();

  expect(prompts).toMatchSnapshot();
  expect(reminders).toEqual(expect.arrayContaining([REMINDER_NAME]));
});

it('should handle the add command with args', async () => {
  await add({
    name: REMINDER_NAME,
  });

  const prompts = inquirer.getPrompts();

  const reminders = await getReminders();

  expect(prompts).toMatchSnapshot();
  expect(reminders).toEqual(expect.arrayContaining([REMINDER_NAME]));
});
