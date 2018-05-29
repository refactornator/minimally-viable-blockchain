import * as React from 'react';
import Block from './models/Block';
import Network from './Network';
import './App.css';

import Blockchain from './components/Blockchain';

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
      <div className="App">
        <p className="App-intro">
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
        </p>
        <Blockchain data={blocks} />
      </div>
    );
  }
}

export default App;
