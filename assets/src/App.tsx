import * as React from 'react';

import Joyride, { Step } from 'react-joyride';

import Block from './models/Block';
import Network from './Network';

import Header from './components/Header';
import Blockchain from './components/Blockchain';

interface AppComponentState {
  blocks: Block[];
  runWalkThrough: boolean;
  steps: Step[];
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
      blocks: this.network.initiate(callback),
      runWalkThrough: false,
      steps: [
        {
          target: '.textarea-and-hash',
          content: 'This if my awesome feature!',
          placement: 'bottom',
          disableBeacon: true
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({ runWalkThrough: true });
  }

  callback = (tour: any) => {
    // const { action, index, type } = tour;
    console.log(tour);
  };

  render() {
    const { blocks, runWalkThrough, steps } = this.state;

    return (
      <div>
        <Joyride steps={steps} run={runWalkThrough} callback={this.callback} />
        <Header network={this.network} />
        <Blockchain data={blocks} />
      </div>
    );
  }
}

export default App;
