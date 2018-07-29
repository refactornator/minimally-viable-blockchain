import { Socket, Channel } from 'phoenix';

import Block from './models/Block';
import BlockChain from './models/Blockchain';

export enum Messages {
  REQUEST_BLOCKCHAIN = 'REQUEST_BLOCKCHAIN',
  REQUEST_LATEST_BLOCK = 'REQUEST_LATEST_BLOCK',
  BLOCK_RESPONSE = 'BLOCK_RESPONSE',
  BLOCKCHAIN_RESPONSE = 'BLOCKCHAIN_RESPONSE'
}

export default class Network {
  blockchain: typeof BlockChain.Type;
  channel: Channel;

  constructor(blockchain: typeof BlockChain.Type) {
    this.blockchain = blockchain;

    const socket = new Socket(
      `${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${
        window.location.host
      }/socket`
    );

    socket.connect();

    this.channel = socket.channel('peers');
    this.initializeMessageHandlers();

    this.channel
      .join()
      .receive('ok', () => {
        console.log('successfully connected to peers channel');
        this.channel.push(Messages.REQUEST_LATEST_BLOCK, {});
      })
      .receive('error', ({ reason }) =>
        console.log('failed to join peers channel', reason)
      )
      .receive('timeout', () =>
        console.log('Networking issue. Still waiting...')
      );
  }

  pushLatestBlock(): void {
    this.channel.push(Messages.BLOCK_RESPONSE, {
      data: this.blockchain.latestBlock
    });
  }

  pushBlockchain(): void {
    this.channel.push(Messages.BLOCKCHAIN_RESPONSE, {
      data: this.blockchain.blocks
    });
  }

  private initializeMessageHandlers(): void {
    this.channel.on(Messages.REQUEST_BLOCKCHAIN, () => this.pushBlockchain());
    this.channel.on(Messages.REQUEST_LATEST_BLOCK, () =>
      this.pushLatestBlock()
    );

    this.channel.on(Messages.BLOCK_RESPONSE, response =>
      this.handleNewestBlockResponse(response)
    );
    this.channel.on(Messages.BLOCKCHAIN_RESPONSE, response =>
      this.handleBlockchainResponse(response)
    );
  }

  private handleNewestBlockResponse(message: {
    data: typeof Block.Type;
  }): void {
    const newBlockReceived = Block.create(message.data);
    const latestBlockHeld = this.blockchain.latestBlock;

    if (latestBlockHeld.hash === newBlockReceived.previousHash) {
      console.log('We can append the received block to our chain');
      this.blockchain.addBlock(newBlockReceived);
    } else if (newBlockReceived.index > latestBlockHeld.index) {
      console.log('We have to query the chain from our peers');
      this.channel.push(Messages.REQUEST_BLOCKCHAIN, {});
    }
  }

  private handleBlockchainResponse(message: {
    data: typeof Block.Type[];
  }): void {
    const receivedBlocks = message.data.map(newBlock => Block.create(newBlock));

    if (receivedBlocks.length > this.blockchain.blocks.length) {
      console.log('Received blockchain is longer than current blockchain');
      this.blockchain.replaceChain(receivedBlocks);
    }
  }
}
