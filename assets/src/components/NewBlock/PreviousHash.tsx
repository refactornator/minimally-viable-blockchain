import * as React from 'react';

import { Form, Input, Label, Popup } from 'semantic-ui-react';

const PreviousHash = ({ value }: { value: string }) => (
  <Form.Field className="previous-hash">
    <Input value={value} labelPosition="right">
      <Popup
        trigger={<Label>previous hash</Label>}
        content="The hash of the previous block. This is the chain in the blockchain."
      />
      <input disabled />
    </Input>
  </Form.Field>
);

export default PreviousHash;
