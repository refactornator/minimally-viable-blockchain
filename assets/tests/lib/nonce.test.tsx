import test from 'ava';
import * as sinon from 'sinon';
import * as Hash from '../../src/lib/hash';

import { guessNonce } from '../../src/lib/nonce';

test('the same nonce is guessed for a particular set of parameters', t => {
  sinon
    .stub(Hash, 'calculateHash')
    .onFirstCall()
    .returns('INVALID_HASH')
    .onSecondCall()
    .returns('VALID_HASH');

  sinon
    .stub(Hash, 'isHashValid')
    .withArgs('INVALID_HASH')
    .returns(false)
    .withArgs('VALID_HASH')
    .returns(true);

  t.is(guessNonce(0, '000', 'Test data', 0), 1);
});
