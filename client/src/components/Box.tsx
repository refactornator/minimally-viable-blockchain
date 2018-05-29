import * as React from 'react';
import styled from 'styled-components';

import Block from '../models/Block';

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  background-color: #366ddc;
`;

const Header = styled.div`
  height: 32px;
  display: flex;
  padding: 10px 12px;
  flex-direction: row;
  background-color: #00527e;
  justify-content: space-between;
`;

const Index = styled.div`
  color: #ffb83f;
`;

const Timestamp = styled.div`
  color: #829fd9;
  font-size: 14px;
`;

const Content = styled.div`
  height: 100%;
  color: #ffb83f;
  padding: 6px 8px;
`;

const Footer = styled.div`
  height: 34px;
  padding: 4px 2px;
  color: #829fd9;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LightFooter = styled(Footer)`
  background-color: #2955ae;
`;

const DarkFooter = styled(Footer)`
  background-color: #0e2451;
`;

interface AppComponentProps {
  data: Block;
}

class Box extends React.Component<AppComponentProps, {}> {
  render() {
    const { data } = this.props;

    return (
      <Container>
        <Header>
          <Index>#{data.index}</Index>
          <Timestamp>
            {data.timestamp > 0
              ? new Date(data.timestamp).toLocaleString()
              : ''}
          </Timestamp>
        </Header>
        <Content>{data.data}</Content>
        <LightFooter>{data.previousHash}</LightFooter>
        <DarkFooter>{data.hash}</DarkFooter>
      </Container>
    );
  }
}

export default Box;
