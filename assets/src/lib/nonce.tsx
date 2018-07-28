import { calculateHash, isValidHash } from '../lib/hash';

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
