import * as React from 'react';
import styled from 'styled-components';

import Block from './models/Block';
import Network from './Network';

import Blockchain from './components/Blockchain';

const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  textarea {
    font-size: 18px;
    height: 60px;
    width: 500px;
    margin-top: 8px;

    @media (min-width: 320px) and (max-width: 767px) {
      width: 90%;
    }
  }

  button {
    font-size: 18px;
    font-weight: bold;
    width: 500px;
    height: 44px;
    margin-top: 4px;

    @media (min-width: 320px) and (max-width: 767px) {
      width: 90%;
    }
  }
`;

interface AppComponentState {
  value: string;
  blocks: Block[];
}

class App extends React.Component<{}, AppComponentState> {
  network: Network;

  constructor(props: {}) {
    super(props);

    this.network = new Network();
    this.network.initiate(blocks => {
      this.setState({ blocks });
    });

    this.state = {
      value: '',
      blocks: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { blocks } = this.state;

    return (
      <div>
        <Header>
          <textarea value={this.state.value} onChange={this.handleChange} />
          <button
            disabled={this.state.value.length === 0}
            onClick={() => {
              this.network.runBlockMine(this.state.value);
              this.setState({
                value: ''
              });
            }}
          >
            Mine!
          </button>
        </Header>
        <Blockchain data={blocks} />
      </div>
    );
  }
}

export default App;
