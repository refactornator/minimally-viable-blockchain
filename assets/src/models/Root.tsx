import { types } from 'mobx-state-tree';

import Block from './Block';
import { isValidNewBlock, isValidChain } from './helpers';
import { guessNonce } from '../lib/nonce';
import { calculateHash, isValidHash } from '../lib/hash';

const Root = types
  .model('Blockchain', {
    blocks: types.array(Block),
    newBlockData: types.optional(types.string, ''),
    newBlockNonce: types.optional(types.number, 0)
  })
  .views(self => ({
    get latestBlock(): typeof Block.Type {
      return self.blocks[self.blocks.length - 1];
    },
    get nextIndex(): number {
      return self.blocks[self.blocks.length - 1].index + 1;
    },
    get latestHash(): string {
      return self.blocks[self.blocks.length - 1].hash;
    }
  }))
  .views(self => ({
    get newBlockHash(): string {
      return calculateHash(
        self.nextIndex,
        self.latestHash,
        self.newBlockData,
        self.newBlockNonce
      );
    }
  }))
  .views(self => ({
    get isNewBlockHashValid(): boolean {
      return isValidHash(self.newBlockHash);
    }
  }))
  .actions(self => ({
    setNewBlockData(newData: string) {
      self.newBlockData = newData;
      self.newBlockNonce = 0;
    },
    setNewBlockNonce(newNonce: number) {
      self.newBlockNonce = newNonce;
    },
    mineNonce() {
      self.newBlockNonce = guessNonce(
        self.nextIndex,
        self.latestHash,
        self.newBlockData,
        self.newBlockNonce
      );
    },
    addBlock(newBlock: typeof Block.Type) {
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
      }
    },
    createNewBlock() {
      const newBlock = Block.create({
        index: self.nextIndex,
        previousHash: self.latestHash,
        timestamp: new Date().getTime(),
        data: self.newBlockData,
        nonce: self.newBlockNonce
      });
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
        self.newBlockData = '';
        self.newBlockNonce = 0;
      }
    },
    replaceChain(blocksToValidate: typeof Block.Type[]) {
      if (isValidChain(blocksToValidate, self.blocks)) {
        self.blocks.replace(blocksToValidate);
      }
    }
  }));

export default Root;
