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
  }
};
export default extension;
