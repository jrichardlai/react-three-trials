import React from 'react';
import ReactTHREE from 'react-three';
import THREE from 'three';
import TimerExtension from '../../lib/extensions/TimerExtension';

@TimerExtension
class CubeRotation extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    startTime: React.PropTypes.objectOf(Date),
  }

  constructor(props) {
    super(props);

    const ticks = Date.now() - this.props.startTime;

    this.state = {
      cubeRotationX: ticks * 0.02,
      cubeRotationY: ticks * 0.0125,
      cubeRotationZ: ticks * 0.015,
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
      <ReactTHREE.Mesh
        geometry={new THREE.CubeGeometry( 200, 200, 200 )}
        material={new THREE.MeshNormalMaterial()}
        position={new THREE.Vector3(...this.props.vector3Position)}
        quaternion={this.getCubeQuaternion()}
        scale={this.getCubeScale()}
        ref='cube'
      />
    );
  }
}

export default CubeRotation;
