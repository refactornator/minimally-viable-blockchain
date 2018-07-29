import * as React from 'react';
import { Form, TextAreaProps } from 'semantic-ui-react';

import NewBlock from '../../models/NewBlock';

const Data = ({ newBlock }: { newBlock: typeof NewBlock.Type }) => (
  <Form.TextArea
    value={newBlock.data}
    error={newBlock.data.length === 0}
    className="data"
    placeholder="Enter something interesting here"
    onChange={(
      _event: React.FormEvent<HTMLTextAreaElement>,
      data: TextAreaProps
    ): void => {
      newBlock.setData(data.value ? data.value.toString() : '');
    }}
  />
);

export default Data;
