import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Robot model representing a humanoid robot for Isaac Sim visualization
const HumanoidRobot = ({ position = [0, 0, 0] }) => {
  const robotRef = useRef();

  useFrame(() => {
    if (robotRef.current) {
      // Add subtle animation to show the robot is active
      robotRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <group ref={robotRef} position={position}>
      {/* Torso */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial 
          color="steelblue" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="lightgray" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="navy" 
          metalness={0.5} 
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="navy" 
          metalness={0.5} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="darkslateblue" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="darkslateblue" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};

// Environment objects for Isaac Sim scene
const IsaacEnvironment = () => {
  return (
    <>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="olive" 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Objects for simulation */}
      <mesh position={[-3, 0.5, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" metalness={0.5} roughness={0.3} />
      </mesh>
      
      <mesh position={[2, 1, 2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="red" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
};

// Main Isaac Sim Visualization Component
const IsaacSimVisualization = () => {
  return (
    <div style={{ height: '500px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} />
        
        {/* Lighting setup for Isaac Sim environment */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} />
        
        {/* Isaac Sim environment */}
        <IsaacEnvironment />
        
        {/* Humanoid robot visualization */}
        <HumanoidRobot position={[0, 0, 0]} />
        
        {/* Contact shadows for the robot */}
        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={1} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        
        {/* Environment lighting */}
        <Environment preset="apartment" />
        
        {/* Camera controls */}
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Canvas>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        Isaac Sim Environment: Humanoid Robot Simulation
      </div>
    </div>
  );
};

export default IsaacSimVisualization;