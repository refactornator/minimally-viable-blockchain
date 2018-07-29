import * as React from 'react';

import {
  Button,
  Form,
  Input,
  Label,
  Popup,
  InputOnChangeData
} from 'semantic-ui-react';

const PreviousHash = ({
  error,
  value,
  setNewBlockNonce,
  mineCallback
}: {
  error: boolean;
  value: number;
  setNewBlockNonce: (newNonce: number) => void;
  mineCallback: () => void;
}) => (
  <Form.Field error={error} className="nonce">
    <Input
      type="number"
      value={value}
      placeholder={0}
      labelPosition="right"
      onChange={(
        _event: React.SyntheticEvent<HTMLInputElement>,
        data: InputOnChangeData
      ): void => setNewBlockNonce(parseInt(data.value, 10))}
    >
      <Popup
        trigger={<Label>nonce</Label>}
        content="A nonsense number that alters the hash so that it will start with 000."
      />
      <input />
      <Button
        secondary
        onClick={mineCallback}
        content="Mine!"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }}
      />
    </Input>
  </Form.Field>
);

export default PreviousHash;
