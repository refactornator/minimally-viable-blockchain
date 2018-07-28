import Block from '../../src/models/Block';
import { guessNonce } from '../../src/lib/nonce';

export const createBlock = (
  index: number,
  previousHash: string,
  data: string
) => {
  const nonce = guessNonce(index, previousHash, data);
  return Block.create({
    index,
    previousHash,
    timestamp: new Date().getTime(),
    data,
    nonce
  });
};
