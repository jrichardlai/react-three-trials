import React      from 'react';
import ReactTHREE from 'react-three';
import THREE      from 'three';

import ControlledCubeRotation from './examples/ControlledCubeRotation';
import CubeRotation           from './examples/CubeRotation';

const styles = {
  menu: {
    'backgroundColor': 'white',
  },
  menuLink: {
    'padding': '5px',
    'margin': '5px',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedApp: 'none',
    };
  }

  getChildProps() {
    return {
      width: this.props.width,
      height: this.props.height,
      mainCamera: this.refs.mainCamera,
    };
  }

  renderSelectedExample() {
    switch (this.state.selectedApp) {
      case 'cubeRotation':
        return <CubeRotation {...this.getChildProps()} />;
      case 'controlledCubeRotation':
        return <ControlledCubeRotation {...this.getChildProps()} />;
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

  renderScene() {
    return (
      <ReactTHREE.Scene
        width={this.props.width}
        height={this.props.height}
        camera='mainCamera'
      >
        {this.renderSelectedExample()}
        <ReactTHREE.PerspectiveCamera
          name='mainCamera'
          ref='mainCamera'
          fov='70'
          aspect={this.props.width/this.props.height}
          far={5000}
          position={new THREE.Vector3(0,0,600)}
          lookat={new THREE.Vector3(0,0,0)}
        />
      </ReactTHREE.Scene>
    );
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        {this.renderScene()}
      </div>
    );
  }
}

export default App;
