import * as _ from 'lodash';

import Block from './models/Block';

var createGenesisBlock = () => {
  return new Block(0, '0', 0, 'genesis block');
};

export default class Blockchain {
  blocks: Block[];

  constructor() {
    this.blocks = [createGenesisBlock()];
  }

  add(block: Block): void {
    if (this.isValidNewBlock(block, this.getLatestBlock())) {
      this.blocks.push(
        new Block(block.index, block.previousHash, block.timestamp, block.data)
      );
    }
  }

  addBlockFromData(data: string): void {
    this.add(this.generateNextBlock(data));
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
    if (!_.isEqual(blocksToValidate[0], this.blocks[0])) {
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
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previoushash');
      return false;
    } else if (
      Block.calculateBlockHash(
        newBlock.index,
        newBlock.previousHash,
        newBlock.timestamp,
        newBlock.data
      ) !== newBlock.hash
    ) {
      console.log(
        'invalid hash: ' + newBlock.calculateBlockHash() + ' ' + newBlock.hash
      );
      return false;
    }
    return true;
  }

  private generateNextBlock(data: string): Block {
    const previousBlock: Block = this.getLatestBlock();
    const nextIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = new Date().getTime();
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, data);
  }
}
