import { types } from 'mobx-state-tree';

import Blockchain from './Blockchain';

const Root = types.model('Root', {
  blockchain: types.optional(Blockchain, {})
});

export default Root;
