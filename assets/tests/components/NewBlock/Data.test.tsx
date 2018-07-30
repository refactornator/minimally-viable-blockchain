import test from 'ava';
import * as sinon from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import NewBlock from '../../../src/models/NewBlock';
import Data from '../../../src/components/NewBlock/Data';

test('that the box can be rendered when a newBlock is passed to it', t => {
  const newBlock = NewBlock.create({
    data: 'Test data'
  });

  t.snapshot(create(<Data newBlock={newBlock} />).toJSON());
});

test('that the text area shows an error if no data is entered', t => {
  const newBlock = NewBlock.create({});
  const wrapper = shallow(<Data newBlock={newBlock} />);
  t.true(wrapper.find('.data').prop('error'));
});

test('that newBlock.setData is called when the text area is changed', t => {
  const newBlock = NewBlock.create({ data: 'Test data' });
  const setDataSpy = sinon.spy(newBlock, 'setData');
  const wrapper = shallow(<Data newBlock={newBlock} />);

  wrapper.find('.data').simulate('change', {}, { value: 'New Test Data!' });

  t.true(setDataSpy.withArgs('New Test Data!').calledOnce);
});
