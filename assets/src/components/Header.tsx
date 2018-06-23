import * as React from 'react';
import styled from 'styled-components';
import Network from '../Network';
import Block from '../models/Block';

const Container = styled.div`
  width: 100%;
  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Top = styled.div`
  width: 505px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div``;

const Index = styled.input`
  width: 60px;
`;

const Nonce = styled.input`
  width: 180px;
`;

const Textarea = styled.textarea`
  font-size: 18px;
  height: 60px;
  width: 500px;
  margin-top: 8px;

  @media (min-width: 320px) and (max-width: 767px) {
    width: 90%;
  }
`;

const Hash = styled.div``;

interface HeaderComponentProps {
  network: Network;
}

interface HeaderComponentState {
  index: number | null;
  data: string;
  nonce: number;
}

class Header extends React.Component<
  HeaderComponentProps,
  HeaderComponentState
> {
  constructor(props: HeaderComponentProps) {
    super(props);

    this.state = {
      index: null,
      data: '',
      nonce: 0
    };
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleNonceChange = this.handleNonceChange.bind(this);
    this.mineCoin = this.mineCoin.bind(this);
    this.createCoin = this.createCoin.bind(this);
  }

  handleIndexChange(event: { target: { value: string } }) {
    this.setState({ index: parseInt(event.target.value, 10) });
  }

  handleTextareaChange(event: { target: { value: string } }) {
    this.setState({ data: event.target.value });
  }

  handleNonceChange(event: { target: { value: string } }) {
    this.setState({ nonce: parseInt(event.target.value, 10) });
  }

  mineCoin(): void {
    const { network } = this.props;
    const latestBlock = network.blockchain.getLatestBlock();
    const previousHash = latestBlock.calculateBlockHash();

    let { index, data, nonce } = this.state;

    if (!index) {
      index = latestBlock.index + 1;
    }

    nonce = Block.guessNonce(index, previousHash, data, nonce);
    this.setState({ nonce });
  }

  createCoin(): void {
    let { data, nonce } = this.state;
    this.props.network.runBlockMine(data, nonce);
    this.setState({ data: '', nonce: 0 });
  }

  render() {
    const { network } = this.props;
    const latestBlock = network.blockchain.getLatestBlock();

    let { index, data, nonce } = this.state;

    if (!index) {
      index = latestBlock.index + 1;
    }

    const calculatedHash = Block.calculateBlockHash(
      index,
      latestBlock.calculateBlockHash(),
      data,
      nonce
    );

    let validCoin = true;
    let validationMessage = '';
    if (index !== latestBlock.index + 1) {
      validCoin = false;
      validationMessage = 'This coin is invalid, the index is incorrect.';
    } else if (!calculatedHash.startsWith('000')) {
      validCoin = false;
      validationMessage = 'This coin is invalid, mine a new nonce.';
    }

    return (
      <Container>
        <Top>
          <Left>
            Index:
            <Index
              type="number"
              value={index}
              onChange={this.handleIndexChange}
            />
          </Left>
          <Right>
            Nonce:
            <Nonce
              type="number"
              value={nonce}
              onChange={this.handleNonceChange}
            />
            <button onClick={this.mineCoin}>Mine!</button>
          </Right>
        </Top>
        <Textarea value={data} onChange={this.handleTextareaChange} />
        <Hash>{calculatedHash}</Hash>
        <div>{!validCoin && validationMessage}</div>
        <button onClick={this.createCoin} disabled={!validCoin}>
          Create
        </button>
      </Container>
    );
  }
}

export default Header;
