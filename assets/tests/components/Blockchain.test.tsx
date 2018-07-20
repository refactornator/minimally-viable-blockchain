import test from 'ava';
import * as React from 'react';
import { shallow } from 'enzyme';

import Block from '../../src/models/Block';
import Blockchain from '../../src/components/Blockchain';

const block1 = Block.create({
  index: 0,
  previousHash: '000',
  timestamp: 0,
  data: 'Test data',
  nonce: 0
});

const block2 = Block.create({
  index: 1,
  previousHash: '000',
  timestamp: 1,
  data: 'Test data 2',
  nonce: 0
});

test('that the blockchain only renders a box when 1 block is passed in', t => {
  const wrapper = shallow(<Blockchain blocks={[block1]} />);
  t.true(wrapper.find('Box').exists());
  t.false(wrapper.find('ChainLink').exists());
});

test('that the blockchain renders a box and a chainlink when 2 blocks are passed in', t => {
  const wrapper = shallow(<Blockchain blocks={[block1, block2]} />);
  t.is(wrapper.find('Box').length, 2);
  t.is(wrapper.find('ChainLink').length, 1);
});
