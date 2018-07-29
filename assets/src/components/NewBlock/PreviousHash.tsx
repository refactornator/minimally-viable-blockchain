import * as React from 'react';
import { Form, Input, Label, Popup } from 'semantic-ui-react';

import NewBlock from '../../models/NewBlock';

const PreviousHash = ({ newBlock }: { newBlock: typeof NewBlock.Type }) => (
  <Form.Field className="previous-hash">
    <Input value={newBlock.previousHash} labelPosition="right">
      <Popup
        trigger={<Label>previous hash</Label>}
        content="The hash of the previous block. This is the chain in the blockchain."
      />
      <input disabled />
    </Input>
  </Form.Field>
);

export default PreviousHash;
