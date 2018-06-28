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
      steps: [
        {
          target: 'body',
          title: 'Welcome to Pivotcoin!',
          content: (
            <div>
              <p>
                Pivotcoin is a working blockchain implementation that runs in
                your browser and teaches you about blockchain. Oh yeah, and it's{' '}
                <a href="https://github.com/wlindner/pivotcoin">open source</a>.
              </p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true
        },
        {
          target: 'body',
          title: 'A public ledger',
          content: (
            <div>
              <p>
                A blockchain is a database. A place to store data you never want
                to change. For instance, Bitcoin is a blockchain of financial
                transactions. New blocks, are always added, never edited or
                deleted. And instead of one copy of the database, every
                participant has a copy.
              </p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true
        },
        {
          target: 'body',
          title: 'Because math',
          content: (
            <div>
              <p>
                Every time a new block is created, it gets sent out to everyone
                else participating in the blockchain, and verified for accuracy.
                It is not possible to change history by editing a block's data,
                because you would have to change every copy of the blockchain at
                once (or at least 51%). How does the blockchain stay secure?
                Follow this tutorial to find out!
              </p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true
        },
        {
          target: '.hash',
          title: 'Hashing',
          content: (
            <div>
              <p>
                The foundational technology of blockchain is hashing. A hash is
                a fixed length number that is uniquely generated no matter the
                input size.
              </p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.data',
          title: 'The data you care about storing',
          content: (
            <div>
              <p>
                This is where data can be entered you want to store in the
                blockchain and securely distribute to the rest of your peers on
                the blockchain. Basically, anyone else on this website. Go ahead
                and input something you want to store.
              </p>
              <p>E.g. 🧙🏽‍ => 👩🏼‍🎤 10₿</p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true,
          spotlightClicks: true
        },
        {
          target: '.hash',
          title: 'Hashing',
          content: (
            <div>
              <p>
                This is your data passed into the SHA-256 Cryptographic Hash
                Algorithm which generates this unique number.
              </p>
              <p>
                This number has letters and numerals because it is in
                hexadecimal format.
              </p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.previous-hash',
          title: 'Chain the blocks together',
          content: (
            <div>
              <p>
                Blocks are linked together by storing the previous block's hash
                along with the data.
              </p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.hash',
          title: 'Proof of Work',
          content: (
            <div>
              <p>
                But you can't add a block with any hash to the blockchain. These
                blocks must have a hash that starts with 000. Finding a hash
                that starts with 000 is a complex mathematical task that acts as
                a "Proof of Work". An economic measure to deter denial of
                service attacks and other service abuses such as spam on a
                network by requiring some work from the service requester.
              </p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.nonce',
          title: 'Mining - guess random numbers',
          content: (
            <div>
              <p>
                Generating a proof of work, called mining, is performed by
                guessing random numbers. The data, the previous hash, and random
                numbers are passed into this hashing function until a hash
                starting with 000 is generated. Click the Mine! button to
                continue.
              </p>
            </div>
          ),
          placement: 'bottom',
          disableBeacon: true,
          spotlightClicks: true
          // styles: {
          //   buttonNext: {
          //     display: 'none'
          //   }
          // }
        }
      ]
    };
  }

  render() {
    const { blocks, steps } = this.state;

    return (
      <Container>
        <Joyride
          run={true}
          continuous
          showProgress
          steps={steps}
          showSkipButton
          scrollToFirstStep
        />
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
