import { types, getParent } from 'mobx-state-tree';
import { calculateHash } from '../lib/hash';
import { guessNonce } from '../lib/nonce';
import Blockchain from './Blockchain';

const NewBlock = types
  .model('NewBlock', {
    data: types.optional(types.string, ''),
    nonce: types.optional(types.number, 0)
  })
  .views(self => ({
    get index(): number {
      const blockchain = getParent(self) as typeof Blockchain.Type;
      return blockchain.latestBlock.index + 1;
    },
    get previousHash(): string {
      const blockchain = getParent(self) as typeof Blockchain.Type;
      return blockchain.latestBlock.hash;
    }
  }))
  .views(self => ({
    get hash(): string {
      return calculateHash(
        self.index,
        self.previousHash,
        self.data,
        self.nonce
      );
    }
  }))
  .actions(self => ({
    setData(data: string) {
      self.data = data;
      self.nonce = 0;
    },
    setNonce(nonce: number) {
      self.nonce = nonce;
    },
    mineNonce() {
      self.nonce = guessNonce(
        self.index,
        self.previousHash,
        self.data,
        self.nonce
      );
    }
  }));

export default NewBlock;
