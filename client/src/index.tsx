import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Socket } from 'phoenix';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let socket = new Socket('ws://localhost:4000/socket');
socket.connect();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
