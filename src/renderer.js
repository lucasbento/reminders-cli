import blessed from 'blessed';
import ora from 'ora';

const ESCAPE_KEYS = ['escape', 'q', 'C-c'];

class Renderer {
  screen = blessed.screen();
  loading = blessed.loading({
    align: 'center',
    top: 'center',
    left: 'center',
  });

  showLoading(text) {
    this.screen.append(this.loading);

    this.loading.load(text);
  }

  stopLoading = () => this.loading.stop();

  render(items) {
    this.list = blessed.list({
      items,
      height: '100%',
      keys: true,
      left: 'center',
      style: {
        selected: {
          fg: 'white',
          bg: 'black',
        },
        item: {
          fg: 'black',
          bg: 'white',
        },
      },
      tags: true,
      top: 'center',
      width: '100%',
      vi: true,
      mouse: true,
      clickable: true,
      keyable: true,
      scrollable: true,
      padding: 1,
      draggable: true,
      alwaysScroll: true,
    });

    this.screen.append(this.list);
    this.list.focus();
    this.screen.render();

    this.screen.onceKey(ESCAPE_KEYS, this.closeScreen);
  }

  closeScreen = () => process.exit();
}

export default Renderer;
