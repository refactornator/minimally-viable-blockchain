import test from 'ava';
import * as React from 'react';
import { create } from 'react-test-renderer';

import Block from '../../src/models/Block';
import Box from '../../src/components/Box';

test('that the box can be rendered when a block is passed to it', t => {
  const block = Block.create({
    index: 0,
    previousHash: '000',
    timestamp: 0,
    data: 'Test data',
    nonce: 0
  });

  t.snapshot(create(<Box block={block} />).toJSON());
});
