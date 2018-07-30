import test from 'ava';
import * as sinon from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import NewBlock from '../../../src/models/NewBlock';
import Nonce from '../../../src/components/NewBlock/Nonce';

let newBlockValidHash: typeof NewBlock.Type;
let newBlockInvalidHash: typeof NewBlock.Type;

test.beforeEach(_t => {
  newBlockValidHash = NewBlock.create();
  Object.defineProperty(newBlockValidHash, 'hash', {
    value: '000',
    writable: false
  });

  newBlockInvalidHash = NewBlock.create();
  Object.defineProperty(newBlockInvalidHash, 'hash', {
    value: 'INVALID_HASH',
    writable: false
  });
});

test('that the input with a mine button is rendered', t => {
  t.snapshot(create(<Nonce newBlock={newBlockValidHash} />).toJSON());
});

test('that the component shows an error if the new block has an invalid hash', t => {
  const wrapper = shallow(<Nonce newBlock={newBlockInvalidHash} />);
  t.true(wrapper.find('.nonce').prop('error'));
});

test('that newBlock.mineNonce is called when the mine button is pressed', t => {
  const mineNonceStub = sinon.stub(newBlockValidHash, 'mineNonce');
  const wrapper = shallow(<Nonce newBlock={newBlockValidHash} />);

  wrapper.find('Button').simulate('click');

  t.true(mineNonceStub.calledOnce);
});

test('that newBlock.setNonce is called when the input is changed', t => {
  const setNonceSpy = sinon.spy(newBlockValidHash, 'setNonce');
  const wrapper = shallow(<Nonce newBlock={newBlockValidHash} />);

  wrapper.find('Input').simulate('change', {}, { value: 42 });

  t.true(setNonceSpy.withArgs(42).calledOnce);
});
