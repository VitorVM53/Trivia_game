import React from 'react';
import Header from '../component/Header';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">Settings</h1>
      </div>
    );
  }
}

export default Settings;
