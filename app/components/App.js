import React        from 'react';
import CubeRotation from './examples/CubeRotation';

class App extends React.Component {
  static childContextTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }

  getChildContext() {
    return {
      width: this.props.width,
      height: this.props.height,
    };
  }

  render() {
    return (
      <CubeRotation />
    );
  }
}

export default App;
