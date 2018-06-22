import * as _ from 'lodash';

import Block from './models/Block';

var createGenesisBlock = () => {
  const index = 0;
  const previousHash = '0';
  const timestamp = 0;
  const data = 'Be kind Do what works Do the right thing';
  const nonce = Block.guessNonce(index, previousHash, data, 0);
  return new Block(index, previousHash, timestamp, data, nonce);
};

export default class Blockchain {
  blocks: Block[] = [createGenesisBlock()];

  add(block: Block): void {
    if (this.isValidNewBlock(block, this.getLatestBlock())) {
      this.blocks.push(
        new Block(
          block.index,
          block.previousHash,
          block.timestamp,
          block.data,
          block.nonce
        )
      );
    }
  }

  addBlockFromDataAndNonce(data: string, nonce: number): void {
    this.add(this.generateNextBlock(data, nonce));
  }

  getLatestBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  replaceChain(newBlocks: Block[]): void {
    if (this.isValidChain(newBlocks) && newBlocks.length > this.blocks.length) {
      console.log(
        'Received blockchain is valid. Replacing current blockchain with received blockchain'
      );
      this.blocks = newBlocks;
    } else {
      console.log('Received blockchain invalid');
    }
  }

  isValidChain(blocksToValidate: Block[]): boolean {
    if (
      blocksToValidate.length === 0 ||
      !_.isEqual(blocksToValidate[0], this.blocks[0])
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

  isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index');
      return false;
    } else if (previousBlock.calculateBlockHash() !== newBlock.previousHash) {
      console.log('invalid previoushash');
      return false;
    }
    // } else if (!newBlock.calculateBlockHash().startsWith('000')) {
    //   console.log('invalid hash: ' + newBlock.calculateBlockHash());
    //   return false;
    // }
    return true;
  }

  private generateNextBlock(data: string, nonce: number): Block {
    const previousBlock: Block = this.getLatestBlock();
    const nextIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = new Date().getTime();
    return new Block(
      nextIndex,
      previousBlock.calculateBlockHash(),
      nextTimestamp,
      data,
      nonce
    );
  }
}
