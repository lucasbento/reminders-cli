import moment from 'moment';

import inquirer from '../../__mocks__/inquirer';
import list from '../list';
import {
  addReminder,
  REMINDER_NAME,
  NUMBER_DAYS_REMINDER_DATE,
  REMINDER_HOUR,
} from '../../../test/helper';

beforeEach(async () => {
  await addReminder();
});

// TODO: provide commands to inquirerjs to update the reminder

it('should handle the list command', async () => {
  await list();

  const prompts = inquirer.getPrompts();

  const reminderDate = moment().add(NUMBER_DAYS_REMINDER_DATE, 'days').format('DD/MM/YYYY');

  expect(prompts[0].type).toEqual('list');
  expect(prompts[0].name).toEqual('name');
  expect(prompts[0].choices).toEqual(expect.arrayContaining([REMINDER_NAME]));

  expect(prompts[1].name).toEqual('name');
  expect(prompts[1].default).toEqual(REMINDER_NAME);

  expect(prompts[2].name).toEqual('date');
  expect(prompts[2].choices).toEqual(expect.arrayContaining([`Current (${reminderDate})`]));

  expect(prompts[4].name).toEqual('time');
  expect(prompts[4].default).toEqual(`${REMINDER_HOUR}:00`);
});
