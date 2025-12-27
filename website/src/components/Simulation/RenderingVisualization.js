import React, { useState, useRef, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Sky,
  Stars,
  Line
} from '@react-three/drei';
import { useSimulation } from '../../context/SimulationContext';

// Robot model with enhanced visuals that responds to physics state
const DetailedRobot = memo(({ position = [0, 0, 0] }) => {
  const { simulationParameters, physicsProperties, simulationRunning } = useSimulation();
  const robotRef = useRef();

  useFrame(() => {
    if (robotRef.current && simulationRunning) {
      // Simple animation to show the robot is active
      robotRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <group ref={robotRef} position={position}>
      {/* Torso - using metallic material */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial
          color="steelblue"
          metalness={0.7}
          roughness={0.3}
          emissive={simulationRunning ? '#000022' : '#000000'}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Head - using smoother material */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="lightgray"
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Arms - using different material for contrast */}
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

      {/* Legs - using matte material */}
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

      {/* Visualization of gravity vector */}
      <Line
        points={[[0, 0, 0], [0, -simulationParameters.gravity * 0.1, 0]]}
        color="red"
        lineWidth={2}
      />
    </group>
  );
});

// Environment with enhanced visuals that responds to physics parameters
const EnhancedEnvironment = memo(() => {
  const { simulationParameters, physicsProperties } = useSimulation();
  const [obstacles, setObstacles] = useState([]);

  useEffect(() => {
    // Create terrain-specific obstacles based on simulation parameters
    if (simulationParameters.environment.terrain === 'obstacle-course') {
      const newObstacles = [
        { id: 1, position: [-3, 0.5, -2], type: 'box', color: 'orange' },
        { id: 2, position: [2, 1, 2], type: 'sphere', color: 'red' }
      ];
      setObstacles(newObstacles);
    } else {
      setObstacles([]);
    }
  }, [simulationParameters.environment.terrain]);

  return (
    <>
      {/* Ground with texture that reflects friction properties */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={simulationParameters.environment.terrain === 'hilly' ? 'saddlebrown' : 'olive'}
          roughness={physicsProperties.friction}
          metalness={0.2}
        />
      </mesh>

      {/* Additional environment objects based on terrain type */}
      {simulationParameters.environment.terrain === 'hilly' && (
        <>
          <mesh position={[-5, -0.5, -5]}>
            <sphereGeometry args={[1.5, 16, 16]} />
            <meshStandardMaterial color="forestgreen" roughness={0.9} />
          </mesh>
          <mesh position={[4, -0.3, 3]}>
            <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
            <meshStandardMaterial color="saddlebrown" roughness={0.2} />
          </mesh>
        </>
      )}

      {/* Dynamic obstacles based on simulation parameters */}
      {obstacles.map(obstacle => (
        <mesh
          key={obstacle.id}
          position={obstacle.position}
          castShadow
          receiveShadow
        >
          {obstacle.type === 'box' ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <sphereGeometry args={[0.8, 32, 32]} />
          )}
          <meshStandardMaterial
            color={obstacle.color}
            metalness={0.5}
            roughness={physicsProperties.friction}
            emissive={obstacle.color}
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </>
  );
});

// Main Rendering Visualization Component
const RenderingVisualization = memo(() => {
  const {
    simulationParameters,
    physicsProperties,
    simulationRunning,
    startSimulation,
    stopSimulation
  } = useSimulation();
  const [cameraPosition, setCameraPosition] = useState([8, 5, 8]);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [showShadows, setShowShadows] = useState(true);
  const [environmentType, setEnvironmentType] = useState('indoor');
  const [renderQuality, setRenderQuality] = useState('medium');

  const handleCameraChange = (newPosition) => {
    setCameraPosition(newPosition);
  };

  // Update lighting based on physics parameters
  const adjustedAmbient = 0.2 + (physicsProperties.friction * 0.1);
  const adjustedDirectional = lightIntensity * (physicsProperties.restitution + 0.5);

  return (
    <div className="simulation-container" role="region" aria-label="High-Fidelity Rendering Visualization">
      <div
        style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}
        aria-label="Rendering Visualization Controls"
        role="toolbar"
      >
        <h3>High-Fidelity Rendering Visualization</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label htmlFor="light-intensity">Light Intensity: </label>
            <input
              id="light-intensity"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              aria-label="Adjust light intensity"
            />
            <span>{lightIntensity.toFixed(1)}</span>
          </div>

          <div>
            <label htmlFor="show-shadows">
              <input
                id="show-shadows"
                type="checkbox"
                checked={showShadows}
                onChange={(e) => setShowShadows(e.target.checked)}
              />
              Show Shadows
            </label>
          </div>

          <div>
            <label htmlFor="render-quality">Quality: </label>
            <select
              id="render-quality"
              value={renderQuality}
              onChange={(e) => setRenderQuality(e.target.value)}
              aria-label="Select rendering quality"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="environment-type">Environment: </label>
            <select
              id="environment-type"
              value={environmentType}
              onChange={(e) => setEnvironmentType(e.target.value)}
              aria-label="Select environment type"
            >
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="space">Space</option>
            </select>
          </div>

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
            aria-label={simulationRunning ? 'Stop the rendering simulation' : 'Start the rendering simulation'}
          >
            {simulationRunning ? 'Stop Simulation' : 'Start Simulation'}
          </button>

          <button
            onClick={() => handleCameraChange([8, 5, 8])}
            style={{ padding: '0.25rem 0.5rem', margin: '0 0.25rem' }}
            aria-label="Reset to default view"
          >
            Default View
          </button>
          <button
            onClick={() => handleCameraChange([0, 5, 10])}
            style={{ padding: '0.25rem 0.5rem', margin: '0 0.25rem' }}
            aria-label="View from top"
          >
            Top View
          </button>
          <button
            onClick={() => handleCameraChange([0, 2, 5])}
            style={{ padding: '0.25rem 0.5rem', margin: '0 0.25rem' }}
            aria-label="View from the side"
          >
            Side View
          </button>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 50 }}
        gl={{
          antialias: renderQuality === 'high',
          powerPreference: renderQuality === 'high' ? 'high-performance' : 'default'
        }}
        frameloop={simulationRunning ? 'always' : 'demand'} // Optimize rendering when not simulating
        role="img"
        aria-label="Interactive rendering visualization of a humanoid robot"
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        {/* Physics-based lighting setup */}
        <ambientLight intensity={adjustedAmbient} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={adjustedDirectional}
          castShadow={showShadows}
          shadow-mapSize-width={renderQuality === 'high' ? 2048 : 1024}
          shadow-mapSize-height={renderQuality === 'high' ? 2048 : 1024}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5 * lightIntensity} />

        {/* Environment based on type */}
        {environmentType === 'indoor' && (
          <>
            <Environment preset="apartment" />
            <color attach="background" args={['#1a1a1a']} />
          </>
        )}

        {environmentType === 'outdoor' && (
          <>
            <Sky sunPosition={[100, 10, 100]} />
            <color attach="background" args={['#87CEEB']} />
          </>
        )}

        {environmentType === 'space' && (
          <>
            <Stars radius={100} depth={50} count={5000} factor={4} />
            <color attach="background" args={['#000011']} />
          </>
        )}

        {/* Contact shadows for the robot */}
        {showShadows && (
          <ContactShadows
            opacity={0.4}
            scale={10}
            blur={1}
            far={10}
            resolution={renderQuality === 'high' ? 512 : 256}
            color="#000000"
          />
        )}

        {/* Robot and environment that respond to physics parameters */}
        <EnhancedEnvironment />
        <DetailedRobot position={[0, 2, 0]} />

        {/* Camera controls */}
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
});

export default RenderingVisualization;