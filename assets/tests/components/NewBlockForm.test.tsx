import test from 'ava';
import * as sinon from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';

import NewBlock from '../../src/models/NewBlock';
import NewBlockForm from '../../src/components/NewBlockForm';

test('that all of the necessary components are rendered with the right props', t => {
  const newBlock = NewBlock.create({ data: 'Something!' });
  Object.defineProperty(newBlock, 'hash', {
    value: '000',
    writable: false
  });
  const wrapper = shallow(
    <NewBlockForm newBlock={newBlock} createNewBlock={() => {}} />
  );
  t.is(wrapper.find('Data').prop('newBlock'), newBlock);
  t.is(wrapper.find('Nonce').prop('newBlock'), newBlock);
  t.is(wrapper.find('PreviousHash').prop('newBlock'), newBlock);
});

test('that the create button is show when the new block is valid', t => {
  const newBlock = NewBlock.create({ data: 'Something!' });
  Object.defineProperty(newBlock, 'hash', {
    value: '000',
    writable: false
  });
  const createNewBlockSpy = sinon.spy();
  const wrapper = shallow(
    <NewBlockForm newBlock={newBlock} createNewBlock={createNewBlockSpy} />
  );
  t.true(wrapper.find('.create-block').exists());
  wrapper.find('.create-block').simulate('click');
  t.true(createNewBlockSpy.calledOnce);
});

test('that the invalid nonce error is shown when the hash is invalid', t => {
  const newBlock = NewBlock.create({ data: 'This is my data', nonce: 123 });
  Object.defineProperty(newBlock, 'hash', {
    value: 'INVALID_HASH',
    writable: false
  });
  const wrapper = shallow(
    <NewBlockForm newBlock={newBlock} createNewBlock={() => {}} />
  );
  t.true(wrapper.find('.validation-message').exists());
  t.is(
    wrapper
      .find('.validation-message')
      .dive()
      .text(),
    'Invalid nonce, click mine.'
  );
});

test('that the invalid data error is shown when the hash is valid, but the data is empty', t => {
  const newBlock = NewBlock.create({ data: '' });
  Object.defineProperty(newBlock, 'hash', {
    value: '000',
    writable: false
  });
  const wrapper = shallow(
    <NewBlockForm newBlock={newBlock} createNewBlock={() => {}} />
  );
  t.true(wrapper.find('.validation-message').exists());
  t.is(
    wrapper
      .find('.validation-message')
      .dive()
      .text(),
    'Enter some data to add to the blockchain.'
  );
});
