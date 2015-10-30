import React from 'react';

import ControlledCubeRotation from './examples/ControlledCubeRotation';
import CubeRotation           from './examples/CubeRotation';

const styles = {
  menu: {
    'background-color': 'white',
  },
  menuLink: {
    'padding': '5px',
    'margin': '5px',
  },
};

class App extends React.Component {
  static childContextTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedApp: 'none',
    };
  }

  getChildContext() {
    return {
      width: this.props.width,
      height: this.props.height,
    };
  }

  getSelectedExample() {
    switch (this.state.selectedApp) {
      case 'cubeRotation':
        return <CubeRotation />;
      case 'controlledCubeRotation':
        return <ControlledCubeRotation />;
    }

    return null;
  }

  renderMenu() {
    return (
      <header style={styles.menu}>
        <button
          style={styles.menuLink}
          onClick={() => { this.setState({selectedApp: 'cubeRotation'}) }}
        >
          Cube
        </button>
        <button
          style={styles.menuLink}
          onClick={() => { this.setState({selectedApp: 'controlledCubeRotation'}) }}
        >
          Controlled Cube
        </button>
      </header>
    )
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        {this.getSelectedExample()}
      </div>
    );
  }
}

export default App;
