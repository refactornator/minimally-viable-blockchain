import * as _ from 'lodash';

import Block from './models/Block';

export default class Blockchain {
  blocks: Block[] = [];

  constructor() {
    let data = 'Be kind';
    let previousHash = '0';
    let timestamp = new Date().getTime();
    let nonce = Block.guessNonce(0, previousHash, data, 0);
    const genesisBlock = new Block(0, previousHash, timestamp, data, nonce);

    data = 'Do what works';
    previousHash = genesisBlock.calculateBlockHash();
    timestamp = new Date().getTime();
    nonce = Block.guessNonce(1, previousHash, data, 0);
    const secondBlock = new Block(1, previousHash, timestamp, data, nonce);

    data = 'Do the right thing';
    previousHash = secondBlock.calculateBlockHash();
    timestamp = new Date().getTime();
    nonce = Block.guessNonce(2, previousHash, data, 0);
    const thirdBlock = new Block(2, previousHash, timestamp, data, nonce);

    this.blocks = [genesisBlock, secondBlock, thirdBlock];
  }

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
    } else if (!newBlock.calculateBlockHash().startsWith('000')) {
      console.log('invalid hash: ' + newBlock.calculateBlockHash());
      return false;
    }
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
