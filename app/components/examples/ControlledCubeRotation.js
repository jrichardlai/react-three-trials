import React      from 'react';
import ReactTHREE from 'react-three';
import THREE      from 'three';

import TimerExtension      from '../../lib/extensions/TimerExtension';

const FirstPersonControls = require('three-first-person-controls')(THREE);

@TimerExtension
class ControlledCubeRotation extends React.Component {
  static contextTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.start   = Date.now();

    this.state   = {
      cubeRotationX: 0.0,
      cubeRotationY: 0.0,
      cubeRotationZ: 1.0,
      cubeScaleX: 1,
      cubeScaleY: 1,
      cubeScaleZ: 1,
    };

    // Move this to main App.
    this.clock = new THREE.Clock();
  }

  componentWillMount() {
    this.animate();
  }

  componentDidMount() {
    this.camControls = new THREE.FirstPersonControls(this.refs.maincamera);
    this.camControls.lookSpeed = 0.4;
    this.camControls.movementSpeed = 50;
    this.camControls.noFly = true;
    this.camControls.lookVertical = true;
    this.camControls.constrainVertical = true;
    this.camControls.verticalMin = 1.0;
    this.camControls.verticalMax = 2.0;
    this.camControls.lon = -150;
    this.camControls.lat = 120;
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

    if (this.camControls) {
      var delta = this.clock.getDelta();
      this.camControls.update(delta);
    }

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
        width={this.context.width}
        height={this.context.height}
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
          ref='maincamera'
          fov='70'
          aspect={this.context.width/this.context.height}
          far={5000}
          position={new THREE.Vector3(0,0,600)}
          lookat={new THREE.Vector3(0,0,0)}
        />
      </ReactTHREE.Scene>
    );
  }
}

export default ControlledCubeRotation;
