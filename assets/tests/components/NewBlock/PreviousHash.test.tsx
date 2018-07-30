import test from 'ava';
import * as React from 'react';
import { create } from 'react-test-renderer';

import NewBlock from '../../../src/models/NewBlock';
import PreviousHash from '../../../src/components/NewBlock/PreviousHash';

test('that the input with a mine button is rendered', t => {
  const newBlock = NewBlock.create();
  Object.defineProperty(newBlock, 'previousHash', {
    value: 'THIS WAS THE PREVIOUS HASH',
    writable: false
  });
  t.snapshot(create(<PreviousHash newBlock={newBlock} />).toJSON());
});
