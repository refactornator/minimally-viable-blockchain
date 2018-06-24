import * as React from 'react';
import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  position: relative;
`;

const Chain = styled(Icon).attrs({
  name: 'chain',
  size: 'huge',
  fitted: true
})`
  color: #ffb83f;
  position: absolute;
  bottom: 15px;
  left: -46px;
  z-index: 100;
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
