import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import {
  Grid,
  Form,
  Button,
  Message,
  Segment,
  Responsive,
  TextAreaProps
} from 'semantic-ui-react';

import Root from '../models/Root';
import { FormEvent } from 'react';

import Nonce from './NewBlock/Nonce';
import PreviousHash from './NewBlock/PreviousHash';

const MessageWithEllipsis = styled(Message).attrs({ attached: 'bottom' })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface NewBlockFormComponentProps {
  store: typeof Root.Type;
}

@observer
class NewBlockForm extends React.Component<NewBlockFormComponentProps, {}> {
  constructor(props: NewBlockFormComponentProps) {
    super(props);

    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(
    _event: FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ): void {
    const { setNewBlockData } = this.props.store;
    let newData = data && data.value ? data.value.toString() : '';

    setNewBlockData(newData);
  }

  render() {
    const {
      mineNonce,
      latestHash,
      newBlockData,
      newBlockHash,
      newBlockNonce,
      createNewBlock,
      setNewBlockNonce,
      isNewBlockHashValid
    } = this.props.store;

    const isNewBlockDataValid = newBlockData !== '';

    let validationMessage = '';
    if (!isNewBlockHashValid) {
      validationMessage = 'Invalid nonce, click mine.';
    }
    if (!isNewBlockDataValid) {
      validationMessage = 'Enter some data to add to the blockchain.';
    }

    return (
      <Grid centered columns={1} style={{ marginTop: 0, marginBottom: 10 }}>
        <Grid.Column computer={6} tablet={8} mobile={15}>
          <Message attached header="Add a new block" />
          <Form className="new-block-form">
            <Segment attached>
              <Form.TextArea
                value={newBlockData}
                error={!isNewBlockDataValid}
                className="data"
                placeholder="Enter something interesting here"
                onChange={this.handleDataChange}
              />
              <Nonce
                error={!isNewBlockHashValid}
                value={newBlockNonce}
                setNewBlockNonce={setNewBlockNonce}
                mineCallback={mineNonce}
              />
              <PreviousHash value={latestHash} />
            </Segment>
            <Responsive className="hash" as={MessageWithEllipsis}>
              {newBlockHash}
            </Responsive>
            {validationMessage ? (
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
                onClick={createNewBlock}
              />
            )}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NewBlockForm;
