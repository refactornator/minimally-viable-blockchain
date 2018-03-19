import sha256 from 'crypto-js/sha256';
import Block from './Block';

var createGenesisBlock = () => {
  let genesisBlock = new Block(0, '0', 0, 'genesis block');

  genesisBlock.hash = Blockchain.calculateBlockHash(genesisBlock);

  return genesisBlock;
};

export default class Blockchain {
  blocks: Block[];

  constructor() {
    this.blocks = [createGenesisBlock()];
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
    } else if (Blockchain.calculateBlockHash(newBlock) !== newBlock.hash) {
      console.log(
        typeof newBlock.hash +
          ' ' +
          typeof Blockchain.calculateBlockHash(newBlock)
      );
      console.log(
        'invalid hash: ' +
          Blockchain.calculateBlockHash(newBlock) +
          ' ' +
          newBlock.hash
      );
      return false;
    }
    return true;
  }

  static calculateBlockHash(block: Block): string {
    return sha256(
      block.index + block.previousHash + block.timestamp + block.data
    ).toString();
  }
}
