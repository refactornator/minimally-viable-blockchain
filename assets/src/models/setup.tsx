import Block from './Block';
import { guessNonce } from '../lib/nonce';

export const createInitialBlocks = () => {
  let index = 0;
  let data = 'Be kind';
  let previousHash = '0';
  let timestamp = new Date().getTime();
  let nonce = guessNonce(0, previousHash, data, 0);
  const genesisBlock = Block.create({
    index,
    previousHash,
    timestamp,
    data,
    nonce
  });

  index++;
  data = 'Do what works';
  previousHash = genesisBlock.hash;
  timestamp = new Date().getTime();
  nonce = guessNonce(1, previousHash, data, 0);
  const secondBlock = Block.create({
    index,
    previousHash,
    timestamp,
    data,
    nonce
  });

  index++;
  data = 'Do the right thing';
  previousHash = secondBlock.hash;
  timestamp = new Date().getTime();
  nonce = guessNonce(2, previousHash, data, 0);
  const thirdBlock = Block.create({
    index,
    previousHash,
    timestamp,
    data,
    nonce
  });

  return [genesisBlock, secondBlock, thirdBlock];
};
