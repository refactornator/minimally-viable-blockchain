import * as React from 'react';

import styled from 'styled-components';

import { Segment, Header } from 'semantic-ui-react';

import Block from './models/Block';
import Network from './Network';

import Tutorial from './components/Tutorial';
import TopMenu from './components/TopMenu';
import NewBlockForm from './components/NewBlockForm';
import Blockchain from './components/Blockchain';

const Container = styled.div`
  overflow-x: hidden;
`;

interface AppState {
  blocks: Block[];
  stepIndex: number;
  dataEdited: boolean;
}

class App extends React.Component<{}, AppState> {
  network: Network;

  constructor(props: {}) {
    super(props);

    this.network = new Network();

    const callback = (blocks: Block[]) => {
      this.setState({ blocks });
    };

    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.dataChangeCallback = this.dataChangeCallback.bind(this);

    this.state = {
      blocks: this.network.initiate(callback),
      stepIndex: 0,
      dataEdited: false
    };
  }

  incrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  };

  decrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  };

  dataChangeCallback = () => {
    this.setState({ dataEdited: true });
  };

  render() {
    const { dataEdited, blocks, stepIndex } = this.state;

    return (
      <Container>
        <TopMenu />
        <NewBlockForm
          network={this.network}
          mineCallback={this.incrementStep}
          dataChangeCallback={this.dataChangeCallback}
        />
        <Segment style={{ margin: 10 }}>
          <Header size="medium">The Blockchain</Header>
          <Blockchain data={blocks} />
        </Segment>
        <Tutorial
          dataEdited={dataEdited}
          stepIndex={stepIndex}
          incrementStep={this.incrementStep}
          decrementStep={this.decrementStep}
        />
      </Container>
    );
  }
}

export default App;
