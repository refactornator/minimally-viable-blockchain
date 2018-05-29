import * as React from 'react';
import styled from 'styled-components';

import Block from '../models/Block';
import Box from './Box';
import ChainLink from './ChainLink';

const Container = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: flex-end;
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
              <React.Fragment>
                <ChainLink />
                <Box key={block.index} data={block} />
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
