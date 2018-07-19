import test from 'ava';
import * as React from 'react';
import { create } from 'react-test-renderer';
import ChainLink from '../../src/components/ChainLink';

test('that the chainlink can be rendered', t => {
  t.snapshot(create(<ChainLink />).toJSON());
});
