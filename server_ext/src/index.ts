import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

//import { ICommandPalette, IFrame } from '@jupyterlab/apputils';
//import { PageConfig } from '@jupyterlab/coreutils';
import { ILauncher } from '@jupyterlab/launcher';
import { requestAPI } from './handler';
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

/**
 * The command IDs used by the server extension plugin.
 */
namespace CommandIDs {
  export const get = 'server:get-file';
}

async function do_get(el: HTMLDivElement) {
  // GET request
  try {
    console.log('GET: hello');
    const data = await requestAPI<any>('hello');
    console.log(data);
//    el.innerHTML = data.data;
    let div = document.createElement('div');
    div.innerHTML = data.data;
    el.appendChild(div);
  } catch (reason) {
    console.error(`Error on GET /jlab-ext-example/hello.\n${reason}`);
  }
}
/**
 * Initialization data for the server-extension-example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'server-extension-example',
  autoStart: true,
  optional: [ILauncher],
  requires: [ICommandPalette],
  activate: async (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    launcher: ILauncher | null
  ) => {
    console.log('JupyterLab extension server-extension-example is activated!');

    // GET request
//    try {
//      console.log('GET hello');
//      const data = await requestAPI<any>('hello');
//      console.log(data);
//    } catch (reason) {
//      console.error(`Error on GET /jlab-ext-example/hello.\n${reason}`);
//    }
//    do_get();

    // POST request
    const dataToSend = { name: 'Gavin' };
    try {
      const reply = await requestAPI<any>('hello', {
        body: JSON.stringify(dataToSend),
        method: 'POST'
      });
      console.log('REPLY IS:', reply);
    } catch (reason) {
      console.error(
        `Error on POST /jlab-ext-example/hello ${dataToSend}.\n${reason}`
      );
    }

    const { commands, shell } = app;
    const command = CommandIDs.get;
    const category = 'Extension Examples';

    commands.addCommand(command, {
      label: 'Get Server Content in a IFrame Widget',
      caption: 'Get Server Content in a IFrame Widget',
      execute: () => {
        const content = new Widget();
        const widget = new MainAreaWidget({ content });
        widget.id = 'burst-jupyterlab';
        widget.title.label = 'Burst';
        widget.title.closable = true;
        let div = document.createElement('div');
        div.innerHTML = "Let's get ready to burst!<br/><br/>";
        let button = document.createElement('button');
        button.innerHTML = "BURST";
        button.onclick=function () {
//          alert('do something bursty');
          do_get(div);
        };
        div.appendChild(button);
        content.node.appendChild(div);
        shell.add(widget, 'main');
      }
    });

    palette.addItem({ command, category: category });

    if (launcher) {
      // Add launcher
      launcher.add({
        command: command,
        category: category
      });
    }
  }
};

export default extension;

//class IFrameWidget extends IFrame {
//  constructor() {
//    super();
//    const baseUrl = PageConfig.getBaseUrl();
//    this.url = baseUrl + 'jlab-ext-example/public/index.html';
//    this.id = 'doc-example';
//    this.title.label = 'Server Doc';
//    this.title.closable = true;
//    this.node.style.overflowY = 'auto';
//  }
//}
