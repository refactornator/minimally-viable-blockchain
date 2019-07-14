import * as React from 'react';
import { findDOMNode } from 'react-dom';
import styled, { keyframes } from 'styled-components';

import Block from '../models/Block';
import {
  Card,
  Icon,
  Popup,
  Message,
  Responsive,
  Input
} from 'semantic-ui-react';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  width: 260px;
  margin-right: 20px;
`;

const Animation = styled.div`
  animation: ${slideIn} 0.6s ease;
`;

const CardHeader = styled(Card.Header)`
  height: 32px;
  display: flex;
  color: #ffb83f;
  font-size: 18px;
  line-height: 18px;
  padding: 7px 7px;
  flex-direction: row;
  background-color: #00527e;
  justify-content: space-between;
`;

const Data = styled(Card.Description)`
  height: 100px;
  padding: 6px;
  color: #ffb83f;
  overflow-y: auto;
`;

const CardField = styled(Input).attrs({
  fluid: true,
  inverted: true
})`
  & > div,
  & > input {
    border-radius: 0 !important;
  }

  & > div {
    color: #829fd9 !important;
    background-color: #00527e !important;
  }

  & > input {
    color: #ffb83f !important;
    background-color: #2955ae !important;
  }
`;

const BottomAttachedMessageWithEllipsis = styled(Message).attrs({
  attached: 'bottom'
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface BoxProps {
  block: typeof Block.Type;
}

class Box extends React.Component<BoxProps, {}> {
  componentDidMount() {
    const node = findDOMNode(this);
    if (node instanceof HTMLElement) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { block } = this.props;

    return (
      <Container>
        <Animation>
          <Card
            className="top attached segment"
            style={{ backgroundColor: '#366ddc' }}
          >
            <CardHeader>
              #{block.index}
              {block.timestamp > 0 && (
                <Popup
                  basic
                  trigger={<Icon name="clock outline" />}
                  content={new Date(block.timestamp).toLocaleString()}
                />
              )}
            </CardHeader>
            <Data>{block.data}</Data>
            <CardField label="nonce" value={block.nonce.toString()} />
            <CardField label="prev. hash" value={block.previousHash} />
          </Card>
          <Responsive as={BottomAttachedMessageWithEllipsis}>
            {block.hash}
          </Responsive>
        </Animation>
      </Container>
    );
  }
}

export default Box;
