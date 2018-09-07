import * as React from 'react';
import { observer } from 'mobx-react';

import styled from 'styled-components';

import { Segment, Header } from 'semantic-ui-react';

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

@observer
class App extends React.Component<AppProps, {}> {
  render() {
    const { blocks, newBlock, createNewBlock } = this.props.store.blockchain;

    return (
      <Container>
        <TopMenu />
        <NewBlockForm newBlock={newBlock} createNewBlock={createNewBlock} />
        <Segment style={{ margin: 10 }}>
          <Header size="medium">The Blockchain</Header>
          <Blockchain blocks={blocks} />
        </Segment>
      </Container>
    );
  }
}

export default App;
