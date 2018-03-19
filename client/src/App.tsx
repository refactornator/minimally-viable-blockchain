import * as React from 'react';
import './App.css';

interface AppComponentProps {
  runBlockMineCallback: (data: string) => void;
}

class App extends React.Component<AppComponentProps, {}> {
  constructor(props: AppComponentProps) {
    super(props);
  }

  render() {
    const { runBlockMineCallback } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to PivotCoin</h1>
        </header>
        <p className="App-intro">
          <button
            onClick={() => {
              runBlockMineCallback('1');
            }}
          >
            Mine!
          </button>
        </p>
      </div>
    );
  }
}

export default App;
