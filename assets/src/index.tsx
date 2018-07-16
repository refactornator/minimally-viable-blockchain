import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { onSnapshot } from 'mobx-state-tree';
import { IArraySplice } from 'mobx';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Root from './models/Root';

import Network from './Network';

import { localStorageKey, initializeState } from './models/setup';
import registerServiceWorker from './registerServiceWorker';

const store = Root.create(initializeState());

const network = new Network(store);

store.blocks.observe((change: IArraySplice) => {
  if (change.addedCount === 1) {
    network.pushLatestBlock();
  }
});

onSnapshot(store, snapshot =>
  localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
);

ReactDOM.render(<App store={store} />, document.getElementById(
  'root'
) as HTMLElement);

registerServiceWorker();
