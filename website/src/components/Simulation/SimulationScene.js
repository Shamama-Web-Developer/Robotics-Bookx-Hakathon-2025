import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';

// Basic 3D simulation visualization component
const SimulationScene = ({ children, ...props }) => {
  return (
    <div
      style={{ height: '500px', width: '100%', backgroundColor: '#1a1a1a' }}
      role="region"
      aria-label="3D Simulation Environment"
    >
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: '#1a1a1a' }}
        {...props}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Grid position={[0, -1, 0]} args={[10, 10]} cellSize={1} cellThickness={0.5} fadeDistance={20} fadeStrength={1} />
        <Environment preset="apartment" />
        <OrbitControls makeDefault />
        {children}
      </Canvas>
    </div>
  );
};

export default SimulationScene;