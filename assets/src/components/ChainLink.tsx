import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { Icon } from 'semantic-ui-react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  opacity: 0;
  position: relative;
  animation: ${fadeIn} 0.4s ease 0.6s;
  animation-fill-mode: forwards;
  z-index: 100;
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

const ChainLink = () => (
  <Container>
    <Chain />
  </Container>
);

export default ChainLink;
