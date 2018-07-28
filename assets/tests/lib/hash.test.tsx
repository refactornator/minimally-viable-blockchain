import test from 'ava';
import * as sinon from 'sinon';
import * as crypto from 'crypto-js';

import { isValidHash, calculateHash } from '../../src/lib/hash';

test('a valid hash starts with 000', t => {
  t.true(isValidHash('000123456789'));
  t.false(isValidHash('123456789000'));
});

test('a hash is calculated from the given parameters', t => {
  const index = 0;
  const previousHash = '000';
  const data = 'Test data';
  const nonce = 0;
  const expectedHash = 'COOLHASHDUDE';
  sinon
    .stub(crypto, 'SHA256')
    .withArgs(index + previousHash + data + nonce)
    .returns({ toString: () => expectedHash });

  t.is(calculateHash(index, previousHash, data, nonce), expectedHash);
});
