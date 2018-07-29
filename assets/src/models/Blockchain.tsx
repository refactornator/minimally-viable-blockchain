import { types } from 'mobx-state-tree';

import Block from './Block';
import NewBlock from './NewBlock';

import { createInitialBlocks } from './setup';
import { isValidNewBlock, isValidChain } from './helpers';

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
  .actions(self => ({
    addBlock(newBlock: typeof Block.Type) {
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
      }
    },
    createNewBlock() {
      const { index, previousHash, data, nonce } = self.newBlock;

      const newBlock = Block.create({
        index,
        previousHash,
        timestamp: new Date().getTime(),
        data,
        nonce
      });
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
        self.newBlock.setData('');
      }
    },
    replaceChain(blocksToValidate: typeof Block.Type[]) {
      if (isValidChain(blocksToValidate, self.blocks)) {
        self.blocks.replace(blocksToValidate);
      }
    }
  }));

export default Blockchain;
