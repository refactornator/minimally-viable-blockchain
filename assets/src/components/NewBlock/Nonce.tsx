import * as React from 'react';
import {
  Button,
  Form,
  Input,
  Label,
  Popup,
  InputOnChangeData
} from 'semantic-ui-react';

import NewBlock from '../../models/NewBlock';
import { isHashValid } from '../../lib/hash';

const Nonce = ({ newBlock }: { newBlock: typeof NewBlock.Type }) => (
  <Form.Field error={!isHashValid(newBlock.hash)} className="nonce">
    <Input
      type="number"
      value={newBlock.nonce}
      placeholder={0}
      labelPosition="right"
      onChange={(
        _event: React.SyntheticEvent<HTMLInputElement>,
        data: InputOnChangeData
      ): void => newBlock.setNonce(parseInt(data.value, 10))}
    >
      <Popup
        trigger={<Label>nonce</Label>}
        content="A nonsense number that alters the hash so that it will start with 000."
      />
      <input />
      <Button
        secondary
        onClick={newBlock.mineNonce}
        content="Mine!"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }}
      />
    </Input>
  </Form.Field>
);

export default Nonce;
