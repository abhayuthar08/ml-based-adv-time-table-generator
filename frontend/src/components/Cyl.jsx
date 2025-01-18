import React, { useRef } from 'react'; // Import useRef
import { useFrame } from '@react-three/fiber'; // Import useFrame
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Cyl() {
  const tex = useTexture("./z2.jpg");
  const cyl = useRef(null);

  // useFrame to animate the rotation
  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta; // Rotating around the y-axis
    }
  });

  return (
    <mesh ref={cyl} rotation={[0, 1.4,0.5]}>
      <cylinderGeometry args={[1,1,60,40, true]} />
      <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default Cyl;
