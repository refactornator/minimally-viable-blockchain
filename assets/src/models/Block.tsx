import { SHA256 } from 'crypto-js';

class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: string;

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
    data: string
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
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
