import * as React from 'react';
import { observer } from 'mobx-react';
import { onAction } from 'mobx-state-tree';

import styled from 'styled-components';

import { Segment, Header } from 'semantic-ui-react';

import Tutorial from './components/Tutorial';
import TopMenu from './components/TopMenu';
import NewBlockForm from './components/NewBlockForm';
import Blockchain from './components/Blockchain';

import Root from './models/Root';

const Container = styled.div`
  overflow-x: hidden;
`;

interface AppProps {
  store: typeof Root.Type;
}

interface AppState {
  stepIndex: number;
}

@observer
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);

    this.state = {
      stepIndex: 0
    };

    onAction(props.store, call => {
      if (call.name === 'mineNonce') {
        this.incrementStep();
      }
    });
  }

  incrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  };

  decrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  };

  render() {
    const { blocks, newBlock, createNewBlock } = this.props.store;
    const { stepIndex } = this.state;

    return (
      <Container>
        <TopMenu />
        <NewBlockForm newBlock={newBlock} createNewBlock={createNewBlock} />
        <Segment style={{ margin: 10 }}>
          <Header size="medium">The Blockchain</Header>
          <Blockchain blocks={blocks} />
        </Segment>
        <Tutorial
          stepIndex={stepIndex}
          newBlockData={newBlock.data}
          incrementStep={this.incrementStep}
          decrementStep={this.decrementStep}
        />
      </Container>
    );
  }
}

export default App;
