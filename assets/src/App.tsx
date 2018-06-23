import * as React from 'react';

import Block from './models/Block';
import Network from './Network';

import Header from './components/Header';
import Blockchain from './components/Blockchain';

interface AppComponentState {
  blocks: Block[];
}

class App extends React.Component<{}, AppComponentState> {
  network: Network;

  constructor(props: {}) {
    super(props);

    this.network = new Network();

    const callback = (blocks: Block[]) => {
      this.setState({ blocks });
    };

    this.state = {
      blocks: this.network.initiate(callback)
    };
  }

  render() {
    const { blocks } = this.state;

    return (
      <div>
        <Header network={this.network} />
        <Blockchain data={blocks} />
      </div>
    );
  }
}

export default App;
