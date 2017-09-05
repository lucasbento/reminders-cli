import updateNotifier from 'update-notifier';
import boxen from 'boxen';
import chalk from 'chalk';

import pkg from '../../package.json';

export default () => {
  updateNotifier({
    pkg,
    callback: (data, update) => {
      if (!update || pkg.version === update.latest) {
        return;
      }

      const message = chalk.cyan(
        `There's an update of ${pkg.name} available:`,
        chalk.dim(pkg.version), chalk.reset('→'), chalk.blue(update.latest),
        chalk.dim('\nRun'), chalk.green(chalk.bold(`npm i -g ${pkg.name}`)), chalk.dim('to update.'),
      );

      const boxenOptions = {
        padding: 1,
        borderColor: 'blue',
        dimBorder: true,
        float: 'center',
        align: 'center',
        margin: 1,
      };

      console.log(boxen(message, boxenOptions));
    },
  });
};
