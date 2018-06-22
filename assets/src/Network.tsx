import Blockchain from './Blockchain';

import { Socket, Channel } from 'phoenix';
import Block from './models/Block';

export enum Messages {
  QUERY_LATEST = 'QUERY_LATEST',
  BLOCKCHAIN_RESPONSE = 'BLOCKCHAIN_RESPONSE',
  QUERY_ALL = 'QUERY_ALL'
}

export default class Network {
  callback: (currentBlockchain: Block[]) => void;
  blockchain: Blockchain;
  socket: Socket;
  channel: Channel;

  constructor() {
    this.blockchain = new Blockchain();

    this.socket = new Socket(
      `${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${
        window.location.host
      }/socket`
    );
  }

  initiate(callback: (currentBlockchain: Block[]) => void): Block[] {
    this.callback = callback;

    this.socket.connect();

    this.channel = this.socket.channel('peers');
    this.channel.on(Messages.QUERY_LATEST, () => this.pushLatestBlock());
    this.channel.on(Messages.QUERY_ALL, () => this.pushAllBlocks());
    this.channel.on(Messages.BLOCKCHAIN_RESPONSE, response => {
      this.handleBlockchainResponse(response);
    });

    this.channel
      .join()
      .receive('ok', () => {
        console.log('successfully connected to peers channel');
        this.channel.push(Messages.QUERY_LATEST, {});
      })
      .receive('error', ({ reason }) =>
        console.log('failed to join peers channel', reason)
      )
      .receive('timeout', () =>
        console.log('Networking issue. Still waiting...')
      );

    this.loadPersistedBlocks();

    return this.blockchain.blocks;
  }

  runBlockMine(data: string): void {
    this.blockchain.addBlockFromData(data);
    this.pushLatestBlock();
    this.persistBlocks();
  }

  private pushLatestBlock(): void {
    this.channel.push(Messages.BLOCKCHAIN_RESPONSE, {
      data: [this.blockchain.getLatestBlock()]
    });
    this.callback(this.blockchain.blocks);
  }

  private pushAllBlocks(): void {
    this.channel.push(Messages.BLOCKCHAIN_RESPONSE, {
      data: this.blockchain.blocks
    });
    this.callback(this.blockchain.blocks);
  }

  private persistBlocks(): void {
    localStorage.setItem('blockchain', JSON.stringify(this.blockchain.blocks));
  }

  private loadPersistedBlocks(): void {
    const savedBlockchainString = localStorage.getItem('blockchain');

    if (typeof savedBlockchainString === 'string') {
      const blocks = JSON.parse(savedBlockchainString).map(
        (item: any) =>
          new Block(item.index, item.previousHash, item.timestamp, item.data)
      );

      if (this.blockchain.isValidChain(blocks)) {
        this.blockchain.blocks = blocks;
      }
    }
  }

  private handleBlockchainResponse(message: { data: Block[] }): void {
    var receivedBlocks = message.data
      .map(
        item =>
          new Block(item.index, item.previousHash, item.timestamp, item.data)
      )
      .sort((b1, b2) => b1.index - b2.index);
    var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    var latestBlockHeld = this.blockchain.getLatestBlock();
    if (latestBlockReceived.index > latestBlockHeld.index) {
      console.log(
        'blockchain possibly behind. We got: ' +
          latestBlockHeld.index +
          ' Peer got: ' +
          latestBlockReceived.index
      );
      if (
        latestBlockHeld.calculateBlockHash() ===
        latestBlockReceived.previousHash
      ) {
        console.log('We can append the received block to our chain');
        this.blockchain.add(latestBlockReceived);
        this.pushLatestBlock();
        this.persistBlocks();
      } else if (receivedBlocks.length === 1) {
        console.log('We have to query the chain from our peer');
        this.channel.push(Messages.QUERY_ALL, {});
      } else {
        console.log('Received blockchain is longer than current blockchain');
        this.blockchain.replaceChain(receivedBlocks);
        this.pushLatestBlock();
        this.persistBlocks();
      }
    }
    this.callback(this.blockchain.blocks);
  }
}
