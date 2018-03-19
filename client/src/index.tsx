import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Socket } from 'phoenix';
import App from './App';
import Blockchain from './Blockchain';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

enum Messages {
  QUERY_LATEST = 'QUERY_LATEST',
  BLOCKCHAIN_RESPONSE = 'BLOCKCHAIN_RESPONSE'
}

const blockchain = new Blockchain();

let socket = new Socket('ws://localhost:4000/socket');
socket.connect();

let channel = socket.channel('peers');
channel.on(Messages.QUERY_LATEST, () =>
  channel.push(Messages.BLOCKCHAIN_RESPONSE, {
    data: [blockchain.getLatestBlock()]
  })
);
channel.on(Messages.BLOCKCHAIN_RESPONSE, blockchainResponse =>
  console.log(blockchainResponse)
);

function pushLatestBlock(): void {
  channel.push(Messages.BLOCKCHAIN_RESPONSE, {
    data: [blockchain.getLatestBlock()]
  });
}

channel
  .join()
  .receive('ok', () => {
    console.log('successfully connected to peers channel');
    channel.push(Messages.QUERY_LATEST, {});
  })
  .receive('error', ({ reason }) =>
    console.log('failed to join peers channel', reason)
  )
  .receive('timeout', () => console.log('Networking issue. Still waiting...'));

function runBlockMine(data: string): void {
  const newBlock = blockchain.generateNextBlock(data);
  blockchain.add(newBlock);
  pushLatestBlock();
  console.log('block added:', newBlock);
}

ReactDOM.render(
  <App runBlockMineCallback={runBlockMine} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
