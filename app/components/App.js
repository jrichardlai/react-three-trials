import React from 'react';
import ReactTHREE from 'react-three';
import THREE from 'three';
import TimerExtension from '../lib/extensions/TimerExtension';

@TimerExtension
class App extends React.Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.start   = Date.now();
    this.state   = {
      cubeRotationX: 0.0,
      cubeRotationY: 0.0,
      cubeRotationZ: 0.0,
      cubeScaleX: 0,
      cubeScaleY: 0,
      cubeScaleZ: 0,
    };
  }

  componentWillMount() {
    this.animate(this.start);
  }

  animate(time) {
    var dtime	= Date.now() - time;

    this.setState({
      cubeRotationX: this.state.cubeRotationX + 0.02,
      cubeRotationY: this.state.cubeRotationY + 0.0125,
      cubeRotationZ: this.state.cubeRotationZ + 0.015,
      cubeScaleX: 1.0 + 0.3*Math.sin(dtime/300),
      cubeScaleY: 1.0 + 0.3*Math.sin(dtime/300),
      cubeScaleZ: 1.0 + 0.3*Math.sin(dtime/300),
    });

    this.props['TimerExtension'].requestAnimationFrame(this.animate);
  }

  getCubeQuaternion() {
    return new THREE.Quaternion().
                     setFromEuler(
                       new THREE.Euler(
                         this.state.cubeRotationX,
                         this.state.cubeRotationY,
                         this.state.cubeRotationZ,
                         'XYZ'
                       )
                     );
  }

  getCubeScale() {
    return new THREE.Vector3(
      this.state.cubeScaleX,
      this.state.cubeScaleY,
      this.state.cubeScaleZ
    );
  }

  render() {
    return (
      <ReactTHREE.Scene
        width={this.props.width}
        height={this.props.height}
        camera={'maincamera'}
      >
        <ReactTHREE.Mesh
          geometry={new THREE.CubeGeometry( 200, 200, 200 )}
          material={new THREE.MeshNormalMaterial()}
          position={new THREE.Vector3(0, 150, 0)}
          quaternion={this.getCubeQuaternion()}
          scale={this.getCubeScale()}
          ref='cube'
        />
        <ReactTHREE.PerspectiveCamera
          name='maincamera'
          fov='70'
          aspect={this.props.width/this.props.height}
          far={5000}
          position={new THREE.Vector3(0,0,600)}
          lookat={new THREE.Vector3(0,0,0)}
        />
      </ReactTHREE.Scene>
    );
  }
}

export default App;
