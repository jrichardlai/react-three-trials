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
  selectedMenubutton: {
    backgroundColor: '#68B0AB',
    color: 'white',
  },
  inputsContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
  },
  addedInputsContainer: {
    'margin-top': 5,
  },
  cubeInput: {
    width: 50,
    'margin-right': 5,
    'text-align': 'center',
    padding: 5,
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
      selectedApp: 'cubeRotation',
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
      startTime: Date.now(),
    };

    this.setState({
      cubes: [...this.state.cubes, newCube],
    });
  }

  getSelectedStyle = (app) => {
    if (app === this.state.selectedApp) {
      return styles.selectedMenubutton;
    }

    return {};
  }

  renderSelectedExample() {
    switch (this.state.selectedApp) {
      case 'cubeRotation':
        return (
          this.state.cubes.map(({x, y, z, startTime}) => (
            <CubeRotation
              {...this.getChildProps()}
              vector3Position={[x, y, z]}
              startTime={startTime}
            />
          ))
        );
      case 'controlledCubeRotation':
        return (
          this.state.cubes.map(({x, y, z, startTime}) => (
            <ControlledCubeRotation
              {...this.getChildProps()}
              vector3Position={[x, y, z]}
              startTime={startTime}
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
          style={{...styles.menuButton, ...this.getSelectedStyle('cubeRotation')}}
          className='btn btn-default'
          onClick={() => { this.setState({selectedApp: 'cubeRotation'}); }}
        >
          Cube
        </button>
        <button
          style={{...styles.menuButton, ...this.getSelectedStyle('controlledCubeRotation')}}
          className='btn btn-default'
          onClick={() => { this.setState({selectedApp: 'controlledCubeRotation'}); }}
        >
          Controlled Cube
        </button>
      </header>
    );
  }

  renderCubeList = () => {
    return (
      <div style={styles.inputsContainer}>
        <div className='form-inline'>
          <div className='form-group'>
            <input ref="cubeX" style={styles.cubeInput} className='form-control' />
            <input ref="cubeY" style={styles.cubeInput} className='form-control' />
            <input ref="cubeZ" style={styles.cubeInput} className='form-control' />
            <button
              onClick={this.handleAddCubeClick}
              className='btn btn-default'
            >Add Cube</button>
          </div>
        </div>
        {
          this.state.cubes.map((cube, index) => (
            <div style={styles.addedInputsContainer} className='form-inline'>
              <div className='form-group'>
                <input style={styles.cubeInput} className='form-control' disabled value={cube.x} />
                <input style={styles.cubeInput} className='form-control' disabled value={cube.y} />
                <input style={styles.cubeInput} className='form-control' disabled value={cube.z} />
                <button
                  onClick={() => this.handleRemoveCubeClick(index) }
                  className='btn btn-default'
                >
                  Remove Cube
                </button>
              </div>
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
