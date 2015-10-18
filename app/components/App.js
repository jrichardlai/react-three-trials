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
    };
  }

  componentWillMount() {
    this.animate(this.start);
  }

  animate(time) {
    this.setState({
      cubeRotationX: this.state.cubeRotationX + 0.02,
      cubeRotationY: this.state.cubeRotationY + 0.0125,
      cubeRotationZ: this.state.cubeRotationZ + 0.015,
    });

// cube.rotation.x += 0.02;
//
// cube.rotation.x += 0.02;
// 	cube.rotation.y += 0.0225;
// 	cube.rotation.z += 0.0175;
//
// 	var dtime	= Date.now() - time;
// 	cube.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
// 	cube.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
// 	cube.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);
    this.props['TimerExtension'].requestAnimationFrame(this.animate);
  }

  getCubeQuaternion() {
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(
      this.state.cubeRotationX,
      this.state.cubeRotationY,
      this.state.cubeRotationZ,
    ), Math.PI / 2 );

    return quaternion;
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
