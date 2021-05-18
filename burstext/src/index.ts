import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'burst-lab-extension:plugin',
  autoStart: true,
  requires: [ICommandPalette],

  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension burst-lab-extension is activated!');
    console.log('ICommandPalette:', palette);

    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({ content });
    widget.id = 'burst-jupyterlab';
    widget.title.label = 'Burst';
    widget.title.closable = true;
    let div = document.createElement('div');
    div.innerHTML = "Let's get ready to burst!<br/><br/>";
    let button = document.createElement('button');
    button.innerHTML = "BURST";
    button.onclick=function () {alert('do something bursty')};
    div.appendChild(button);
    content.node.appendChild(div);

    console.log(widget);

    // Add an application command
    const command: string = 'burst:open';
    app.commands.addCommand(command, {
      label: 'Burst',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });
  }
};
export default extension;
