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
  mineCallback: () => void;
  dataChangeCallback: () => void;
}

interface NewBlockFormComponentState {
  index: number;
  previousHash: string;
  data: string;
  nonce: number;
}

class NewBlockForm extends React.Component<
  NewBlockFormComponentProps,
  NewBlockFormComponentState
> {
  constructor(props: NewBlockFormComponentProps) {
    super(props);

    const latestBlock = props.network.blockchain.getLatestBlock();
    const previousHash = latestBlock.calculateBlockHash();
    const index = latestBlock.index + 1;

    this.state = {
      index,
      data: '',
      nonce: 0,
      previousHash
    };

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleNonceChange = this.handleNonceChange.bind(this);
    this.mineCoin = this.mineCoin.bind(this);
    this.createCoin = this.createCoin.bind(this);
  }

  handleDataChange(
    _event: FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ): void {
    const nonce = 0;

    if (data && data.value) {
      this.setState({ data: data.value.toString(), nonce });
    } else {
      this.setState({ data: '', nonce });
    }

    this.props.dataChangeCallback();
  }

  handleNonceChange(
    _event: SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ): void {
    this.setState({ nonce: parseInt(data.value, 10) });
  }

  mineCoin(): void {
    const { index, data, previousHash, nonce } = this.state;
    const newNonce = Block.guessNonce(index, previousHash, data, nonce);
    this.setState({ nonce: newNonce });
    this.props.mineCallback();
  }

  createCoin(): void {
    let { data, nonce } = this.state;
    this.props.network.runBlockMine(data, nonce);
    this.setState({ data: '', nonce: 0 });
  }

  render() {
    const { index, data, nonce, previousHash } = this.state;

    const calculatedHash = Block.calculateBlockHash(
      index,
      previousHash,
      data,
      nonce
    );

    let validCoin = true;
    let invalidData;
    let invalidNonce;
    let validationMessage = '';
    if (!calculatedHash.startsWith('000')) {
      validCoin = false;
      invalidNonce = true;
      validationMessage = 'Invalid nonce, click mine.';
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
          <Form className="new-block-form">
            <Segment attached>
              <Form.TextArea
                value={data}
                error={invalidData}
                className="data"
                placeholder="Enter something interesting here"
                onChange={this.handleDataChange}
              />
              <Form.Field error={invalidNonce} className="nonce">
                <Input
                  type="number"
                  value={nonce}
                  placeholder={0}
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
              <Form.Field className="previous-hash">
                <Input value={previousHash} labelPosition="right">
                  <Popup
                    trigger={<Label>previous hash</Label>}
                    content="The hash of the previous block. This is the chain in the blockchain."
                  />
                  <input disabled />
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
                  className="create-block"
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
