import * as React from 'react';
import Block from './models/Block';
import Network from './Network';
import './App.css';

import Blockchain from './components/Blockchain';

interface AppComponentState {
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
      blocks: []
    };
  }

  render() {
    const { blocks } = this.state;

    return (
      <div className="App">
        <p className="App-intro">
          <button
            onClick={() => {
              this.network.runBlockMine('1');
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
