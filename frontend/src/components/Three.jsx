import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'; // Ensure correct imports
import Cyl from './Cyl';
import "./styless.css"

function Three() {
  return (
    <div><Canvas flat camera={{ fov: 135 }}>
    <OrbitControls />
    <ambientLight />
    <Cyl />
    <EffectComposer>
      <Bloom
        
        intensity={5} // Adjust intensity to see if it makes the effect more noticeable
        luminanceThreshold={0} // Try adjusting this value
        luminanceSmoothing={0} // Range [0, 1], adjust for better results
      />
      <ToneMapping adaptive />
    </EffectComposer>
  </Canvas></div>
  );
}

export default Three;
