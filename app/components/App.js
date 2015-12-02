import React      from 'react';
import ReactTHREE from 'react-three';
import THREE      from 'three';

import ControlledCubeRotation from './examples/ControlledCubeRotation';
import CubeRotation           from './examples/CubeRotation';

const styles = {
  menu: {
    backgroundColor: 'white',
  },
  menuButton: {
    padding: 5,
    margin: 5,
  },
  inputsContainer: {
    position: 'absolute',
    backgroundColor: 'yellow',
    padding: 10,
  },
  cubeInput: {
    width: 20,
    padding: 5,
  },
  cubeValues: {
    marginTop: 5,
  },
  cubeValue: {
    width: 20,
    padding: 5,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedApp: 'none',
      cubes: [],
    };
  }

  getChildProps() {
    return {
      width: this.props.width,
      height: this.props.height,
      mainCamera: this.refs.mainCamera,
    };
  }

  handleRemoveCubeClick = (index) => {
    var newCubes = new Array(...this.state.cubes);
    newCubes.splice(index, 1);
    this.setState({cubes: newCubes});
  }

  handleAddCubeClick = () => {
    const newCube = {
      x: this.refs.cubeX.value,
      y: this.refs.cubeY.value,
      z: this.refs.cubeZ.value,
    };

    this.setState({
      cubes: [...this.state.cubes, newCube],
    });
  }

  renderSelectedExample() {
    switch (this.state.selectedApp) {
      case 'cubeRotation':
        return (
          this.state.cubes.map(({x, y, z}) => (
            <CubeRotation
              {...this.getChildProps()}
              vector3Position={[x, y, z]}
            />
          ))
        );
      case 'controlledCubeRotation':
        return (
          this.state.cubes.map(({x, y, z}) => (
            <ControlledCubeRotation
              {...this.getChildProps()}
              vector3Position={[x, y, z]}
            />
          ))
        );
    }

    return null;
  }

  renderMenu() {
    return (
      <header style={styles.menu}>
        <button
          style={styles.menuButton}
          onClick={() => { this.setState({selectedApp: 'cubeRotation'}) }}
        >
          Cube
        </button>
        <button
          style={styles.menuButton}
          onClick={() => { this.setState({selectedApp: 'controlledCubeRotation'}) }}
        >
          Controlled Cube
        </button>
      </header>
    )
  }

  renderCubeList = () => {
    return (
      <div style={styles.inputsContainer}>
        <div>
          <input ref="cubeX" style={styles.cubeInput} />
          <input ref="cubeY" style={styles.cubeInput} />
          <input ref="cubeZ" style={styles.cubeInput} />
          <button
            onClick={this.handleAddCubeClick}
          >Add Cube</button>
        </div>
        {
          this.state.cubes.map((cube, index) => (
            <div style={styles.cubeValues}>
              <span style={styles.cubeValue}>{cube.x}</span>
              <span style={styles.cubeValue}>{cube.y}</span>
              <span style={styles.cubeValue}>{cube.z}</span>
              <button
                onClick={() => this.handleRemoveCubeClick(index) }
              >
                Remove Cube
              </button>
            </div>
          ))
        }
      </div>
    );
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
          position={new THREE.Vector3(0, 0, 600)}
          lookat={new THREE.Vector3(0,0,0)}
        />
      </ReactTHREE.Scene>
    );
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        {this.renderCubeList()}
        {this.renderScene()}
      </div>
    );
  }
}

export default App;
