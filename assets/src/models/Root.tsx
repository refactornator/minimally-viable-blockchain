import * as _ from 'lodash';
import { types } from 'mobx-state-tree';

import Block, { isValidHash } from './Block';

export enum Messages {
  QUERY_LATEST = 'QUERY_LATEST',
  BLOCKCHAIN_RESPONSE = 'BLOCKCHAIN_RESPONSE',
  QUERY_ALL = 'QUERY_ALL'
}

const Root = types
  .model('Blockchain', {
    blocks: types.array(Block)
  })
  .views(self => ({
    get latestBlock(): typeof Block.Type {
      return self.blocks[self.blocks.length - 1];
    },
    isValidNewBlock(
      newBlock: typeof Block.Type,
      previousBlock: typeof Block.Type
    ) {
      if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
      } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
      } else if (!isValidHash(newBlock.hash)) {
        console.log('invalid hash: ' + newBlock.hash);
        return false;
      }
      return true;
    },
    isValidChain(blocksToValidate: typeof Block.Type[]) {
      if (
        self.blocks.length === 0 ||
        !_.isEqual(
          _.omit(blocksToValidate[0], 'timestamp'),
          _.omit(self.blocks[0], 'timestamp')
        )
      ) {
        return false;
      }

      const tempBlocks = [blocksToValidate[0]];
      for (var i = 1; i < blocksToValidate.length; i++) {
        if (this.isValidNewBlock(blocksToValidate[i], tempBlocks[i - 1])) {
          tempBlocks.push(blocksToValidate[i]);
        } else {
          return false;
        }
      }
      return true;
    }
  }))
  .actions(self => ({
    addBlock(newBlock: typeof Block.Type) {
      if (self.isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
      }
    },
    replaceChain(blocksToValidate: typeof Block.Type[]) {
      if (self.isValidChain(blocksToValidate)) {
        self.blocks.replace(blocksToValidate);
      }
    }
  }))
  .actions(self => ({
    addBlockFromDataAndNonce(data: string, nonce: number) {
      const previousBlock = self.latestBlock;
      const previousHash = previousBlock.hash;
      const index = previousBlock.index + 1;
      const timestamp = new Date().getTime();

      const newBlock = Block.create({
        index,
        previousHash,
        timestamp,
        data,
        nonce
      });
      self.addBlock(newBlock);
    }
  }));

export default Root;
