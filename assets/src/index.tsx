import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IArraySplice } from 'mobx';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Root from './models/Root';

import Network from './Network';

import registerServiceWorker from './registerServiceWorker';

export const localStorageKey = 'blockchain';

let initialStore = { blockchain: {} };
const savedBlockchainString = localStorage.getItem(localStorageKey);
if (typeof savedBlockchainString === 'string') {
  initialStore.blockchain = { blocks: JSON.parse(savedBlockchainString) };
}

const store = Root.create(initialStore);
const network = new Network(store.blockchain);

store.blockchain.blocks.observe((change: IArraySplice) => {
  if (change.addedCount === 1) {
    network.pushLatestBlock();
  }
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(store.blockchain.blocks)
  );
});

ReactDOM.render(<App store={store} />, document.getElementById(
  'root'
) as HTMLElement);

registerServiceWorker();
