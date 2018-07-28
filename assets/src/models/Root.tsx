import { types } from 'mobx-state-tree';

import Block from './Block';
import { isValidNewBlock, isValidChain } from './helpers';

const Root = types
  .model('Blockchain', {
    blocks: types.array(Block)
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
    createNewBlock(data: string, nonce: number) {
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
      if (isValidNewBlock(newBlock, self.latestBlock)) {
        self.blocks.push(newBlock);
      }
    },
    replaceChain(blocksToValidate: typeof Block.Type[]) {
      if (isValidChain(blocksToValidate, self.blocks)) {
        self.blocks.replace(blocksToValidate);
      }
    }
  }));

export default Root;
