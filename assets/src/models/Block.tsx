import { types } from 'mobx-state-tree';
import { calculateHash } from '../lib/hash';

const Block = types
  .model('Block', {
    index: types.number,
    previousHash: types.string,
    timestamp: types.number,
    data: types.string,
    nonce: types.number
  })
  .views(({ index, previousHash, data, nonce }) => ({
    get hash() {
      return calculateHash(index, previousHash, data, nonce);
    }
  }));

export default Block;
