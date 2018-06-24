import * as React from 'react';
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

interface AppComponentProps {
  data: Block[];
}

class Blockchain extends React.Component<AppComponentProps, {}> {
  render() {
    const { data } = this.props;

    return (
      <Container>
        {data.map((block, blockIndex) => {
          if (blockIndex > 0) {
            return (
              <React.Fragment key={block.index}>
                <ChainLink />
                <Box data={block} />
              </React.Fragment>
            );
          } else {
            return <Box key={block.index} data={block} />;
          }
        })}
      </Container>
    );
  }
}

export default Blockchain;
