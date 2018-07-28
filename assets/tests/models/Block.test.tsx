import test from 'ava';
import * as sinon from 'sinon';

import Block from '../../src/models/Block';
import * as Hash from '../../src/lib/hash';

test('a block can be created with a calculated hash property', t => {
  const calculateHashStub = sinon.stub(Hash, 'calculateHash');
  const expectedHash = 'THEBESTHASHINTHEWORLD';
  calculateHashStub.returns(expectedHash);

  const block = Block.create({
    index: 0,
    previousHash: '000',
    timestamp: 0,
    data: 'Test data',
    nonce: 0
  });

  t.is(block.hash, expectedHash);
});
