import React, { useState, useEffect, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls as DreiOrbitControls, Grid, Environment } from '@react-three/drei';
import { useSimulation } from '../../context/SimulationContext';

// Ground plane component
const Ground = memo(() => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
    type: 'Static',
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="olive" />
    </mesh>
  );
});

// Simple humanoid robot model using primitive shapes
const HumanoidRobot = memo(({ position = [0, 5, 0] }) => {
  const { physicsProperties, simulationParameters } = useSimulation();

  const [ref, api] = useBox(() => ({
    mass: physicsProperties.mass,
    position,
    material: {
      friction: physicsProperties.friction,
      restitution: physicsProperties.restitution,
    },
    linearDamping: physicsProperties.linearDamping,
    angularDamping: physicsProperties.angularDamping,
    onCollide: (e) => console.log('Robot collided with', e.body.name),
  }));

  // Robot parts
  return (
    <group ref={ref} dispose={null}>
      {/* Torso */}
      <mesh>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial color="steelblue" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="steelblue" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="steelblue" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="darkslateblue" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="darkslateblue" />
      </mesh>
    </group>
  );
});

// Physics-based environment with objects
const PhysicsEnvironment = memo(() => {
  const { simulationParameters } = useSimulation();

  return (
    <>
      {/* Ground plane */}
      <Ground />

      {/* Obstacles based on environment config */}
      {simulationParameters.environment.terrain === 'obstacle-course' && (
        <>
          <mesh position={[-3, 0.5, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>

          <mesh position={[2, 1, 2]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </>
      )}
    </>
  );
});

// Main Physics Simulation Component
const PhysicsSimulation = memo(() => {
  const { simulationParameters, physicsProperties, simulationRunning, startSimulation, stopSimulation } = useSimulation();
  const [simulationTime, setSimulationTime] = useState(0);

  // Update simulation time when running
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      // Optimize interval based on time step to reduce CPU usage
      const intervalTime = Math.max(16, simulationParameters.timeStep * 1000); // Minimum 60 FPS
      interval = setInterval(() => {
        setSimulationTime(prev => prev + simulationParameters.timeStep);
      }, intervalTime);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationRunning, simulationParameters.timeStep]);

  return (
    <div className="simulation-container" role="region" aria-label="Physics Simulation Environment">
      <div
        style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}
        aria-label="Physics Simulation Controls"
        role="toolbar"
      >
        <h3>Physics Simulation Environment</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <p>Simulation Time: {simulationTime.toFixed(2)}s</p>
          <button
            onClick={() => simulationRunning ? stopSimulation() : startSimulation()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: simulationRunning ? '#ff6b6b' : '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            aria-label={simulationRunning ? 'Stop the physics simulation' : 'Start the physics simulation'}
          >
            {simulationRunning ? 'Stop Simulation' : 'Start Simulation'}
          </button>
        </div>
      </div>

      <Physics
        gravity={[0, -simulationParameters.gravity, 0]}
        allowSleep={false}
        defaultContactMaterial={{
          friction: physicsProperties.friction,
          restitution: physicsProperties.restitution,
        }}
      >
        <Canvas
          camera={{ position: [8, 5, 8], fov: 50 }}
          style={{ height: '500px' }}
          frameloop={simulationRunning ? 'always' : 'demand'} // Optimize rendering when not simulating
          role="img"
          aria-label="Interactive physics simulation of a humanoid robot"
        >
          <color attach="background" args={['#1a1a1a']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <PhysicsEnvironment />
          <HumanoidRobot />

          <DreiOrbitControls makeDefault />
          <Grid position={[0, -1, 0]} args={[10, 10]} cellSize={1} cellThickness={0.5} fadeDistance={20} fadeStrength={1} />
          <Environment preset="apartment" />
        </Canvas>
      </Physics>
    </div>
  );
});

export default PhysicsSimulation;