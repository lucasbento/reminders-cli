import applescript from 'applescript-promise';

import Renderer from '../renderer';

const renderer = new Renderer();

const showReminderList = async () => {
  renderer.showLoading('Loading reminders');

  const reminders = await applescript.execFile(`${__dirname}/../scripts/get_reminders.applescript`);

  renderer.stopLoading();

  renderer.render(reminders);

  renderer.list.on('select', item => {
    console.log(renderer.list.getItemIndex(item.content));
  });
};

export default showReminderList;
