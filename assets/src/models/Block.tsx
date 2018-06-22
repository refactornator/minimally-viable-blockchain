import { SHA256 } from 'crypto-js';

class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: string;
  nonce: number;

  static calculateBlockHash(
    index: number,
    previousHash: string,
    data: string,
    nonce: number
  ): string {
    return SHA256(index + previousHash + data + nonce).toString();
  }

  static guessNonce(
    index: number,
    previousHash: string,
    data: string,
    nonce: number
  ): number {
    let calculatedHash = Block.calculateBlockHash(
      index,
      previousHash,
      data,
      nonce
    );
    while (!calculatedHash.startsWith('000')) {
      calculatedHash = Block.calculateBlockHash(
        index,
        previousHash,
        data,
        (nonce += 1)
      );
    }
    return nonce;
  }

  constructor(
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
    nonce: number
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = nonce;
  }

  calculateBlockHash(): string {
    return Block.calculateBlockHash(
      this.index,
      this.previousHash,
      this.data,
      this.nonce
    );
  }
}

export default Block;
