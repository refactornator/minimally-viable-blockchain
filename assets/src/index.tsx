import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IArraySplice } from 'mobx';
import { Socket } from 'phoenix';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Root from './models/Root';

import registerServiceWorker from './registerServiceWorker';

export const localStorageKey = 'blockchain';

let initialStore = { blockchain: {} };
const savedBlockchainString = localStorage.getItem(localStorageKey);
if (typeof savedBlockchainString === 'string') {
  initialStore.blockchain = { blocks: JSON.parse(savedBlockchainString) };
}

const socket = new Socket(
  `${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${
    window.location.host
  }/socket`
);
socket.connect();

const store = Root.create(initialStore, { socket });

store.blockchain.blocks.observe((_change: IArraySplice) => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(store.blockchain.blocks)
  );
});

ReactDOM.render(<App store={store} />, document.getElementById(
  'root'
) as HTMLElement);

registerServiceWorker();
