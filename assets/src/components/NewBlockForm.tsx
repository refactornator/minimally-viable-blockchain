import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  Grid,
  Form,
  Button,
  Message,
  Segment,
  Responsive
} from 'semantic-ui-react';

import { isValidHash } from '../lib/hash';

import Data from './NewBlock/Data';
import Nonce from './NewBlock/Nonce';
import PreviousHash from './NewBlock/PreviousHash';

const MessageWithEllipsis = styled(Message).attrs({ attached: 'bottom' })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewBlockForm = observer(({ newBlock, createNewBlock }) => {
  const isNewBlockHashValid = isValidHash(newBlock.hash);
  const isNewBlockDataValid = newBlock.data !== '';

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
            <Data newBlock={newBlock} />
            <Nonce newBlock={newBlock} />
            <PreviousHash newBlock={newBlock} />
          </Segment>
          <Responsive className="hash" as={MessageWithEllipsis}>
            {newBlock.hash}
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
});

export default NewBlockForm;
