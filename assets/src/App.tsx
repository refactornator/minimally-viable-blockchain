import * as React from 'react';

import styled from 'styled-components';
import Joyride, { Step } from 'react-joyride';

import { Segment, Menu, Header } from 'semantic-ui-react';

import Block from './models/Block';
import Network from './Network';

import NewBlockForm from './components/NewBlockForm';
import Blockchain from './components/Blockchain';

const Container = styled.div`
  overflow-x: hidden;
`;

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
      <Container>
        <Joyride steps={steps} run={runWalkThrough} callback={this.callback} />
        <Menu fixed="top">
          <Menu.Item header>Pivotcoin!</Menu.Item>
        </Menu>
        <NewBlockForm network={this.network} />
        <Segment style={{ margin: 10 }}>
          <Header size="medium">The Blockchain</Header>
          <Blockchain data={blocks} />
        </Segment>
      </Container>
    );
  }
}

export default App;
