import test from 'ava';
import * as sinon from 'sinon';
import { createBlock } from './_test_helper';
import Block from '../../src/models/Block';
import Root from '../../src/models/Root';
import * as Helpers from '../../src/models/helpers';

let root: typeof Root.Type;
let isValidNewBlockStub: sinon.SinonStub;
let isValidChainStub: sinon.SinonStub;
let firstBlock: typeof Block.Type, secondBlock: typeof Block.Type;

test.before(_t => {
  isValidNewBlockStub = sinon.stub(Helpers, 'isValidNewBlock');
  isValidChainStub = sinon.stub(Helpers, 'isValidChain');
});

test.after(_t => {
  isValidNewBlockStub.restore();
  isValidChainStub.restore();
});

test.beforeEach(_t => {
  let index = 0;
  firstBlock = createBlock(index++, '000', 'Test data 1');
  secondBlock = createBlock(index++, firstBlock.hash, 'Test data 2');

  root = Root.create({
    blocks: [firstBlock, secondBlock]
  });
});

test.serial(
  'that the root model stores blocks with a property for the latest block',
  t => {
    t.is(root.latestBlock, secondBlock);
  }
);

test.serial('a new block being added', t => {
  isValidNewBlockStub.returns(false);
  const thirdBlock = createBlock(
    secondBlock.index + 1,
    secondBlock.hash,
    'Test data 3'
  );

  root.addBlock(thirdBlock);
  t.is(root.blocks.length, 2);

  isValidNewBlockStub.returns(true);
  root.addBlock(thirdBlock);
  t.is(root.blocks.length, 3);
});

test.serial('a new block being created', t => {
  const clock = sinon.useFakeTimers();
  isValidNewBlockStub.returns(false);

  root.createNewBlock('Test data 3', 0);
  t.is(root.blocks.length, 2);

  isValidNewBlockStub.returns(true);
  root.createNewBlock('Test data 3', 0);
  t.is(root.blocks.length, 3);
  t.is(root.latestBlock.timestamp, 0);
  t.is(root.latestBlock.index, secondBlock.index + 1);
  t.is(root.latestBlock.previousHash, secondBlock.hash);
  clock.restore();
});

test.serial('the blockchain being replaced', t => {
  const firstNewBlock = createBlock(0, '000', 'Awesome new data');
  const secondNewBlock = createBlock(
    1,
    firstNewBlock.hash,
    'it is the coolest data ever'
  );
  const thirdNewBlock = createBlock(
    2,
    secondNewBlock.hash,
    'seriously though, the coolest'
  );
  const newBlocks = [firstNewBlock, secondNewBlock, thirdNewBlock];
  isValidChainStub.returns(false);
  root.replaceChain(newBlocks);
  t.is(root.blocks.length, 2);
  t.is(root.latestBlock.data, secondBlock.data);

  isValidChainStub.returns(true);
  root.replaceChain(newBlocks);
  t.is(root.blocks.length, 3);
  t.is(root.latestBlock, thirdNewBlock);
});
