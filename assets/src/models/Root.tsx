import { types } from 'mobx-state-tree';
import { isValidNewBlock, isValidChain } from './helpers';

import Block from './Block';
import NewBlock from './NewBlock';

const Root = types
  .model('Root', {
    blocks: types.array(Block),
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

export default Root;
