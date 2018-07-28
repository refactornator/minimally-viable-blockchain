import test from 'ava';
import { createBlock } from './_test_helper';

import Block from '../../src/models/Block';
import {
  isValidNewBlock,
  isValidChain,
  BlockStatus
} from '../../src/models/helpers';

let firstBlock: typeof Block.Type;
let secondBlock: typeof Block.Type;

test.beforeEach(_t => {
  firstBlock = createBlock(0, '000', 'Test data 1');
  secondBlock = createBlock(1, firstBlock.hash, 'Test data 2');
});

test('a valid new block', t => {
  const newBlock = createBlock(
    firstBlock.index + 1,
    firstBlock.hash,
    'Test data 2'
  );
  t.is(isValidNewBlock(newBlock, firstBlock), BlockStatus.VALID);
});

test('a new block is invalid if the index is not one more than the previous block', t => {
  const badIndexBlock = createBlock(Infinity, '123', 'Test data 2');
  t.is(isValidNewBlock(badIndexBlock, firstBlock), BlockStatus.INVALID_INDEX);
});

test("a new block is invalid if the previous hash does not match the previous block's hash", t => {
  const badPreviousHashBlock = createBlock(
    firstBlock.index + 1,
    '123',
    'Test data 2'
  );
  t.is(
    isValidNewBlock(badPreviousHashBlock, firstBlock),
    BlockStatus.INVALID_PREVIOUS_HASH
  );
});

test('a new block is invalid if it does not have a valid hash', t => {
  const badHashBlock = Block.create({
    index: firstBlock.index + 1,
    previousHash: firstBlock.hash,
    timestamp: new Date().getTime(),
    data: 'Foo',
    nonce: 0
  });
  t.is(isValidNewBlock(badHashBlock, firstBlock), BlockStatus.INVALID_HASH);
});

test('a new chain is valid', t => {
  const aNewSecondBlock = createBlock(
    firstBlock.index + 1,
    firstBlock.hash,
    'This is different data'
  );
  const validBlocksToValidate = [firstBlock, aNewSecondBlock];
  const currentBlocks = [firstBlock, secondBlock];
  t.true(isValidChain(validBlocksToValidate, currentBlocks));
});

test('a new chain is invalid when the genesis block is different', t => {
  const badFirstBlock = createBlock(0, '666', 'This is a bad, bad block');
  const invalidBlocksToValidate = [badFirstBlock];
  const currentBlocks = [firstBlock, secondBlock];
  t.false(isValidChain(invalidBlocksToValidate, currentBlocks));
});

test('a new chain is invalid when any blocks are invalid', t => {
  const badHashBlock = Block.create({
    index: firstBlock.index + 1,
    previousHash: firstBlock.previousHash,
    timestamp: new Date().getTime(),
    data: 'Foo',
    nonce: 0
  });
  const invalidBlocksToValidate = [firstBlock, badHashBlock];
  const currentBlocks = [firstBlock, secondBlock];
  t.false(isValidChain(invalidBlocksToValidate, currentBlocks));
});
