import test from 'ava';
import * as sinon from 'sinon';
import * as mobxStateTree from 'mobx-state-tree';

import * as Hash from '../../src/lib/hash';
import * as Nonce from '../../src/lib/nonce';

import NewBlock from '../../src/models/NewBlock';
import Block from '../../src/models/Block';

let latestBlock: typeof Block.Type;

test.before(_t => {
  latestBlock = Block.create({
    index: 16,
    data: '',
    timestamp: 0,
    previousHash: '000',
    nonce: 0
  });
  sinon.stub(latestBlock, 'hash').get(() => '000');
  sinon.stub(mobxStateTree, 'getParent').returns({ latestBlock });
});

test('a new block has index and previousHash properties that refer to the latestBlock', t => {
  const newBlock = NewBlock.create();

  t.is(newBlock.index, 17);
  t.is(newBlock.previousHash, '000');
  t.is(newBlock.data, '');
  t.is(newBlock.nonce, 0);
});

test('hash is generated for this new block', t => {
  const calculateHashStub = sinon
    .stub(Hash, 'calculateHash')
    .returns('AWESOMEHASHDUDE');
  const newBlock = NewBlock.create();

  t.is(newBlock.hash, 'AWESOMEHASHDUDE');
  t.true(calculateHashStub.withArgs(17, '000', '', 0).calledOnce);
});

test('setData sets the data and resets the nonce', t => {
  const newBlock = NewBlock.create({ data: 'initial data', nonce: 72 });
  newBlock.setData('new data!');

  t.is(newBlock.data, 'new data!');
  t.is(newBlock.nonce, 0);
});

test('setNonce sets the nonce', t => {
  const newBlock = NewBlock.create({ data: 'initial data', nonce: 72 });
  newBlock.setNonce(42);

  t.is(newBlock.nonce, 42);
});

test('mineNonce calls guessNonce and sets the value returned', t => {
  const guessNonceStub = sinon.stub(Nonce, 'guessNonce').returns(14);
  const newBlock = NewBlock.create();

  newBlock.mineNonce();

  t.is(newBlock.nonce, 14);
  t.true(guessNonceStub.withArgs(17, '000', '', 0).calledOnce);
});
