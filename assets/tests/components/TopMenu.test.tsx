import test from 'ava';
import * as React from 'react';
import { create } from 'react-test-renderer';
import TopMenu from '../../src/components/TopMenu';

test('that the top menu can be rendered', t => {
  t.snapshot(create(<TopMenu />).toJSON());
});
