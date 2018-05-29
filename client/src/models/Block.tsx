import { SHA256 } from 'crypto-js';

class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: string;
  hash: string;

  static calculateBlockHash(
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string {
    return SHA256(index + previousHash + timestamp + data).toString();
  }

  constructor(
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
    hash?: string
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;

    if (hash) {
      this.hash = hash;
    } else {
      this.hash = Block.calculateBlockHash(
        index,
        previousHash,
        timestamp,
        data
      );
    }
  }

  calculateBlockHash(): string {
    return Block.calculateBlockHash(
      this.index,
      this.previousHash,
      this.timestamp,
      this.data
    );
  }
}

export default Block;
