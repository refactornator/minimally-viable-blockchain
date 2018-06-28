import * as React from 'react';
import styled from 'styled-components';

import {
  Grid,
  Form,
  Input,
  Label,
  Popup,
  Button,
  Message,
  Segment,
  Responsive,
  TextAreaProps,
  InputOnChangeData
} from 'semantic-ui-react';

import Network from '../Network';
import Block from '../models/Block';
import { SyntheticEvent, FormEvent } from 'react';

const MessageWithEllipsis = styled(Message).attrs({ attached: 'bottom' })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface NewBlockFormComponentProps {
  network: Network;
}

interface NewBlockFormComponentState {
  index: number | null;
  data: string;
  nonce: number;
}

class NewBlockForm extends React.Component<
  NewBlockFormComponentProps,
  NewBlockFormComponentState
> {
  constructor(props: NewBlockFormComponentProps) {
    super(props);

    this.state = {
      index: null,
      data: '',
      nonce: 0
    };
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleNonceChange = this.handleNonceChange.bind(this);
    this.mineCoin = this.mineCoin.bind(this);
    this.resetIndex = this.resetIndex.bind(this);
    this.createCoin = this.createCoin.bind(this);
  }

  handleIndexChange(
    event: SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ): void {
    this.setState({ index: parseInt(data.value, 10) });
  }

  handleDataChange(
    event: FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ): void {
    const latestBlock = this.props.network.blockchain.getLatestBlock();
    const index = latestBlock.index + 1;
    const nonce = 0;

    if (data && data.value) {
      this.setState({ index, data: data.value.toString(), nonce });
    } else {
      this.setState({ index, data: '', nonce });
    }
  }

  handleNonceChange(
    event: SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ): void {
    this.setState({ nonce: parseInt(data.value, 10) });
  }

  resetIndex(): void {
    const { network } = this.props;
    const latestBlock = network.blockchain.getLatestBlock();
    this.setState({ index: latestBlock.index + 1 });
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
    let { index, data, nonce } = this.state;
    this.props.network.runBlockMine(data, nonce);
    if (index) index++;
    this.setState({ index, data: '', nonce: 0 });
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
    let invalidData;
    let invalidNonce;
    let invalidIndex;
    let validationMessage = '';
    if (!calculatedHash.startsWith('000')) {
      validCoin = false;
      invalidNonce = true;
      validationMessage = 'Invalid nonce, click mine.';
    }
    if (index !== latestBlock.index + 1) {
      validCoin = false;
      invalidIndex = true;
      validationMessage = 'Wrong index for the next block.';
    }
    if (data === '') {
      validCoin = false;
      invalidData = true;
      validationMessage = 'Enter some data to add to the blockchain.';
    }

    return (
      <Grid centered columns={1} style={{ marginTop: 0, marginBottom: 10 }}>
        <Grid.Column computer={6} tablet={8} mobile={15}>
          <Message attached header="Add a new block" />
          <Form>
            <Segment attached>
              <Form.Field error={invalidIndex}>
                <Input
                  type="number"
                  value={index}
                  placeholder={0}
                  className="index"
                  labelPosition="left"
                  onChange={this.handleIndexChange}
                >
                  <Popup
                    trigger={<Label>index</Label>}
                    content="The index of the next block in the chain."
                  />
                  <input />
                  <Button
                    secondary
                    disabled={!invalidIndex}
                    onClick={this.resetIndex}
                    content="Reset"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0
                    }}
                  />
                </Input>
              </Form.Field>
              <Form.TextArea
                value={data}
                error={invalidData}
                className="data"
                placeholder="Enter something interesting here"
                onChange={this.handleDataChange}
              />
              <Form.Field error={invalidNonce}>
                <Input
                  type="number"
                  value={nonce}
                  placeholder={0}
                  className="nonce"
                  labelPosition="right"
                  onChange={this.handleNonceChange}
                >
                  <Popup
                    trigger={<Label>nonce</Label>}
                    content="A nonsense number that alters the hash so that it will start with 000."
                  />
                  <input />
                  <Button
                    secondary
                    onClick={this.mineCoin}
                    content="Mine!"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0
                    }}
                  />
                </Input>
              </Form.Field>
            </Segment>
            <Responsive className="hash" as={MessageWithEllipsis}>
              {calculatedHash}
            </Responsive>
            <div>
              {!validCoin && validationMessage ? (
                <Message negative size="small" style={{ margin: 0 }}>
                  {validationMessage}
                </Message>
              ) : (
                <Button
                  fluid
                  primary
                  size="large"
                  type="submit"
                  floated="right"
                  content="Create"
                  style={{ height: 44 }}
                  onClick={this.createCoin}
                  disabled={!validCoin}
                />
              )}
            </div>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NewBlockForm;
