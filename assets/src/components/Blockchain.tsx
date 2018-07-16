import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Block from '../models/Block';
import Box from './Box';
import ChainLink from './ChainLink';

const Container = styled.div`
  display: flex;
  flex-flow: row;
  padding: 2px 2px 30px 2px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

interface BlockchainProps {
  blocks: typeof Block.Type[];
}

const Blockchain = observer(({ blocks }: BlockchainProps) => (
  <Container>
    {blocks.map((block, blockIndex) => (
      <React.Fragment key={block.index}>
        {blockIndex > 0 && <ChainLink />}
        <Box block={block} />
      </React.Fragment>
    ))}
  </Container>
));

export default Blockchain;
