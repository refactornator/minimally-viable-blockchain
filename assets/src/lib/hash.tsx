import { SHA256 } from 'crypto-js';

export const isHashValid = (hash: string) => hash.startsWith('000');

export const calculateHash = (
  index: number,
  previousHash: string,
  data: string,
  nonce: number
) => SHA256(index + previousHash + data + nonce).toString();
