import { types } from 'mobx-state-tree';
import { SHA256 } from 'crypto-js';

export const isValidHash = (hash: string) => hash.startsWith('000');

export const calculateHash = (
  index: number,
  previousHash: string,
  data: string,
  nonce: number
) => SHA256(index + previousHash + data + nonce).toString();

export const guessNonce = (
  index: number,
  previousHash: string,
  data: string,
  nonce = 0
) => {
  let calculatedHash = calculateHash(index, previousHash, data, nonce);
  while (!isValidHash(calculatedHash)) {
    calculatedHash = calculateHash(index, previousHash, data, (nonce += 1));
  }
  return nonce;
};

const Block = types
  .model('Block', {
    index: types.number,
    previousHash: types.string,
    timestamp: types.number,
    data: types.string,
    nonce: types.number
  })
  .views(({ index, previousHash, data, nonce }) => ({
    get hash() {
      return calculateHash(index, previousHash, data, nonce);
    }
  }));

export default Block;
