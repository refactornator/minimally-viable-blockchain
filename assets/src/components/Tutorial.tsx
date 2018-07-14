import * as React from 'react';
import Joyride, { Step } from 'react-joyride';

interface TutotrialProps {
  stepIndex: number;
  dataEdited: boolean;
  incrementStep: () => void;
  decrementStep: () => void;
}

class Tutorial extends React.Component<TutotrialProps, {}> {
  steps: Step[] = [
    {
      target: 'body',
      title: 'Welcome to Pivotcoin!',
      content: (
        <p>
          Pivotcoin is a blockchain that runs in your browser. Follow along this
          tutorial to learn how it works.
        </p>
      ),
      placement: 'center',
      disableBeacon: true
    },
    {
      target: 'body',
      title: 'Public Ledger',
      content: (
        <p>
          A blockchain is a database. New blocks, are added to the end of the
          chain, and can't be deleted or changed. Instead of one copy of the
          database, every participant has a copy.
        </p>
      ),
      placement: 'center',
      disableBeacon: true
    },
    {
      target: 'body',
      title: 'Because Math',
      content: (
        <p>
          When a new block is added, it's transferred to everyone else
          participating in the blockchain, and verified for accuracy. It is not
          possible to change history by editing a block's data, because you
          would have to change every copy of the blockchain at once (or at least
          51%).
        </p>
      ),
      placement: 'center',
      disableBeacon: true
    },
    {
      target: '.hash',
      title: 'Hashing',
      content: (
        <p>
          In order to be useful, this public database must stay secure. The
          blockchain is secure because it uses a technology called hashing. A
          hash is a fixed length number that is uniquely generated no matter the
          input size.
        </p>
      ),
      disableBeacon: true
    },
    {
      target: '.data',
      title: 'Data',
      content: (
        <p>
          This is where data for a new block is entered. Later, we'll create
          this block and this data will be distributed to all of the peers on
          the network. For Pivotcoin, that means anyone else on this website. Go
          ahead and input something you want to store.
        </p>
      ),
      disableBeacon: true,
      spotlightClicks: true,
      styles: {
        buttonNext: {
          display: 'none'
        }
      }
    },
    {
      target: '.hash',
      title: 'Hashing',
      content: (
        <p>
          This is your data passed into the SHA-256 Cryptographic Hash Algorithm
          which generates this unique number.
        </p>
      ),
      disableBeacon: true
    },
    {
      target: '.previous-hash',
      title: 'Chain the Blocks',
      content: (
        <p>
          Blocks are linked together by storing the previous block's hash along
          with the data.
        </p>
      ),
      disableBeacon: true
    },
    {
      target: '.hash',
      title: 'Proof of Work',
      content: (
        <p>
          To prevent peers from creating as many new blocks as they want, some
          work must be performed every time a new block is created. For
          Pivotcoin, a new block's hash must start with 000. Finding a hash that
          starts with 000 is a complex mathematical task that acts as a
          <a
            href="https://en.wikipedia.org/wiki/Proof-of-work_system"
            target="_blank"
          >
            {' '}
            Proof of Work
          </a>.
        </p>
      ),
      disableBeacon: true
    },
    {
      target: '.nonce',
      title: 'Mining',
      content: (
        <div>
          <p>
            Generating a proof of work, called mining, is performed by guessing
            random numbers. The data, the previous hash, and random numbers are
            passed into this hashing function until a hash starting with 000 is
            generated. Click the Mine! button to continue.
          </p>
        </div>
      ),
      disableBeacon: true,
      spotlightClicks: true,
      styles: {
        zIndex: 100,
        buttonNext: {
          display: 'none'
        }
      }
    },
    {
      target: '.new-block-form, .hash',
      title: 'Mining Complete',
      content: (
        <p>
          A valid nonce was mined, you can tell because the hash starts with
          000. Click "Create" to add your first block to the chain.
        </p>
      ),
      placement: 'bottom',
      disableBeacon: true
    }
  ];

  callback = (tour: any) => {
    const { action, type } = tour;
    const { incrementStep, decrementStep } = this.props;

    if (type === 'tour:end') {
      // Update user preferences with completed tour flag
    } else if (
      type === 'step:after' ||
      type === 'close' ||
      type === 'error:target_not_found'
    ) {
      // Sunce this is a controlled tour you'll need to update the state to advance the tour
      action === 'next' ? incrementStep() : decrementStep();
    }
  };

  render() {
    const { dataEdited, stepIndex } = this.props;

    if (dataEdited) {
      const dataStep = this.steps[4];

      if (dataStep.styles) {
        dataStep.styles.buttonNext = {};
        this.steps[4] = dataStep;
      }
    }

    return (
      <Joyride
        run={true}
        continuous
        showProgress
        steps={this.steps}
        showSkipButton
        scrollToSteps
        stepIndex={stepIndex}
        callback={this.callback}
      />
    );
  }
}

export default Tutorial;
