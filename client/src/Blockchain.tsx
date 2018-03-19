import Block from './Block';

var createGenesisBlock = () => {
  return new Block(0, '0', 0, 'genesis block');
};

export default class Blockchain {
  blocks: Block[];

  constructor() {
    this.blocks = [createGenesisBlock()];
  }

  generateNextBlock(data: string): Block {
    const previousBlock: Block = this.getLatestBlock();
    const nextIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = new Date().getTime();
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, data);
  }

  add(newBlock: Block): void {
    if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
      this.blocks.push(newBlock);
    }
  }

  getLatestBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index');
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previoushash');
      return false;
    } else if (newBlock.calculateBlockHash() !== newBlock.hash) {
      console.log(
        'invalid hash: ' + newBlock.calculateBlockHash() + ' ' + newBlock.hash
      );
      return false;
    }
    return true;
  }
}
