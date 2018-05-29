import * as React from 'react';
import styled from 'styled-components';

import Chain from './Chain';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  svg {
    width: 50px;
    height: 50px;
  }
`;

class ChainLink extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <Chain />
      </Container>
    );
  }
}

export default ChainLink;
