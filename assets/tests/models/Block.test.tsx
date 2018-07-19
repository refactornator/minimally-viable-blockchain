import test from 'ava';
import Block, {
  isValidHash,
  calculateHash,
  guessNonce
} from '../../src/models/Block';

const expectedHash =
  '5b8d5a36a4955e39571a09eb1463d8dc814c4be03bbd64199cf4a457ad5b50a3';

test('a valid hash starts with 000', t => {
  t.true(isValidHash('000123456789'));

  t.false(isValidHash('123456789000'));
});

test('a hash is calculated from the given parameters', t => {
  t.is(calculateHash(0, '000', 'Test data', 0), expectedHash);
});

test('the same nonce is guessed for a particular set of parameters', t => {
  t.is(guessNonce(0, '000', 'Test data', 0), 447);
});

test('a block can be created with a calculated has property', t => {
  const block = Block.create({
    index: 0,
    previousHash: '000',
    timestamp: 0,
    data: 'Test data',
    nonce: 0
  });

  t.is(block.hash, expectedHash);
});
