import * as React from 'react';
import { observer } from 'mobx-react';

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
  dataEdited: boolean;
}

@observer
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.dataChangeCallback = this.dataChangeCallback.bind(this);

    this.state = {
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
    const { dataEdited, stepIndex } = this.state;

    return (
      <Container>
        <TopMenu />
        <NewBlockForm
          store={this.props.store}
          mineCallback={this.incrementStep}
          dataChangeCallback={this.dataChangeCallback}
        />
        <Segment style={{ margin: 10 }}>
          <Header size="medium">The Blockchain</Header>
          <Blockchain blocks={this.props.store.blocks} />
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
