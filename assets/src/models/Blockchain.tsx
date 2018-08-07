import { Socket } from 'phoenix';
import { types, getEnv } from 'mobx-state-tree';

import Block from './Block';
import NewBlock from './NewBlock';

import { createInitialBlocks } from './setup';
import { isValidNewBlock, isValidChain } from './helpers';

export enum Messages {
  REQUEST_BLOCKCHAIN = 'REQUEST_BLOCKCHAIN',
  REQUEST_LATEST_BLOCK = 'REQUEST_LATEST_BLOCK',
  BLOCK_RESPONSE = 'BLOCK_RESPONSE',
  BLOCKCHAIN_RESPONSE = 'BLOCKCHAIN_RESPONSE'
}

const Blockchain = types
  .model('Blockchain', {
    blocks: types.optional(types.array(Block), createInitialBlocks()),
    newBlock: types.optional(NewBlock, {})
  })
  .views(self => ({
    get latestBlock(): typeof Block.Type {
      return self.blocks[self.blocks.length - 1];
    }
  }))
  .volatile(self => {
    const socket: Socket = getEnv(self).socket;
    return {
      channel: socket.channel('peers')
    };
  })
  .actions(self => ({
    addBlock(newBlock: typeof Block.Type) {
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
        self.channel.push(Messages.BLOCK_RESPONSE, {
          data: newBlock
        });
      }
    },
    replaceChain(blocksToValidate: typeof Block.Type[]) {
      if (isValidChain(blocksToValidate, self.blocks)) {
        self.blocks.replace(blocksToValidate);
      }
    }
  }))
  .actions(self => ({
    createNewBlock() {
      const { index, previousHash, data, nonce } = self.newBlock;

      const newBlock = Block.create({
        index,
        previousHash,
        timestamp: new Date().getTime(),
        data,
        nonce
      });
      self.addBlock(newBlock);
      self.newBlock.setData('');
    },
    pushLatestBlock() {
      self.channel.push(Messages.BLOCK_RESPONSE, {
        data: self.latestBlock
      });
    },
    pushBlockchain() {
      self.channel.push(Messages.BLOCKCHAIN_RESPONSE, {
        data: self.blocks
      });
    },
    receiveNewBlock(message: { data: typeof Block.Type }) {
      const newBlockReceived = Block.create(message.data);
      const latestBlockHeld = self.latestBlock;

      if (latestBlockHeld.hash === newBlockReceived.previousHash) {
        console.log('We can append the received block to our chain');
        self.addBlock(newBlockReceived);
      } else if (newBlockReceived.index > latestBlockHeld.index) {
        console.log('We have to query the chain from our peers');
        self.channel.push(Messages.REQUEST_BLOCKCHAIN, {});
      }
    },
    receiveNewBlockchain(message: { data: typeof Block.Type[] }) {
      const receivedBlocks = message.data.map(newBlock =>
        Block.create(newBlock)
      );

      if (receivedBlocks.length > self.blocks.length) {
        console.log('Received blockchain is longer than current blockchain');
        self.replaceChain(receivedBlocks);
      }
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.channel.on(Messages.REQUEST_BLOCKCHAIN, self.pushBlockchain);
      self.channel.on(Messages.REQUEST_LATEST_BLOCK, self.pushLatestBlock);

      self.channel.on(Messages.BLOCK_RESPONSE, self.receiveNewBlock);
      self.channel.on(Messages.BLOCKCHAIN_RESPONSE, self.receiveNewBlockchain);
      self.channel
        .join()
        .receive('ok', () => {
          console.log('successfully connected to peers channel');
          self.channel.push(Messages.REQUEST_LATEST_BLOCK, {});
        })
        .receive('error', ({ reason }) =>
          console.log('failed to join peers channel', reason)
        )
        .receive('timeout', () =>
          console.log('Networking issue. Still waiting...')
        );
    }
  }));

export default Blockchain;
