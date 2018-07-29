import { calculateHash, isHashValid } from '../lib/hash';

export const guessNonce = (
  index: number,
  previousHash: string,
  data: string,
  nonce = 0
) => {
  let calculatedHash = calculateHash(index, previousHash, data, nonce);
  while (!isHashValid(calculatedHash)) {
    calculatedHash = calculateHash(index, previousHash, data, (nonce += 1));
  }
  return nonce;
};
