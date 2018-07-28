import * as _ from 'lodash';

import Block from './Block';
import { isValidHash } from '../lib/hash';

export enum BlockStatus {
  INVALID_INDEX,
  INVALID_PREVIOUS_HASH,
  INVALID_HASH,
  VALID
}

export const isValidNewBlock = (
  newBlock: typeof Block.Type,
  previousBlock: typeof Block.Type
): BlockStatus => {
  if (previousBlock.index + 1 !== newBlock.index) {
    return BlockStatus.INVALID_INDEX;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    return BlockStatus.INVALID_PREVIOUS_HASH;
  } else if (!isValidHash(newBlock.hash)) {
    return BlockStatus.INVALID_HASH;
  }
  return BlockStatus.VALID;
};

export const isValidChain = (
  blocksToValidate: typeof Block.Type[],
  currentBlocks: typeof Block.Type[]
) => {
  if (
    currentBlocks.length === 0 ||
    !_.isEqual(
      _.omit(blocksToValidate[0], 'timestamp'),
      _.omit(currentBlocks[0], 'timestamp')
    )
  ) {
    return false;
  }

  const tempBlocks = [blocksToValidate[0]];
  for (var i = 1; i < blocksToValidate.length; i++) {
    if (
      isValidNewBlock(blocksToValidate[i], tempBlocks[i - 1]) ===
      BlockStatus.VALID
    ) {
      tempBlocks.push(blocksToValidate[i]);
    } else {
      return false;
    }
  }
  return true;
};
