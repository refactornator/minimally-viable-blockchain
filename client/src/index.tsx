import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import Blockchain from './Blockchain';
import Communication from './Communication';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const blockchain = new Blockchain();
const communication = new Communication(blockchain);

communication.initiate();

ReactDOM.render(
  <App
    runBlockMineCallback={(data: string) => {
      communication.runBlockMine(data);
    }}
  />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
