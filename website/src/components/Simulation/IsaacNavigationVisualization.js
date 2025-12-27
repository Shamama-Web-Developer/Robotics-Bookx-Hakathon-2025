import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Line } from '@react-three/drei';
import { useSimulation } from '../../context/SimulationContext';

// Humanoid robot model for navigation visualization
const HumanoidNavigationBot = ({ position = [0, 0, 0], targetPosition = [5, 0, 5] }) => {
  const { simulationParameters, physicsProperties } = useSimulation();
  const robotRef = useRef();
  const [footsteps, setFootsteps] = useState([]);

  // Calculate footsteps based on navigation path
  useEffect(() => {
    // Simplified footstep calculation
    const steps = [];
    const stepSize = 0.3;
    const direction = [
      targetPosition[0] - position[0],
      0,
      targetPosition[2] - position[2]
    ];
    
    const distance = Math.sqrt(direction[0]*direction[0] + direction[2]*direction[2]);
    const stepsCount = Math.floor(distance / stepSize);
    
    for (let i = 0; i < stepsCount; i++) {
      const progress = i / stepsCount;
      steps.push([
        position[0] + direction[0] * progress,
        position[1],
        position[2] + direction[2] * progress
      ]);
    }
    
    setFootsteps(steps);
  }, [position, targetPosition]);

  return (
    <group ref={robotRef} position={position}>
      {/* Torso */}
      <mesh>
        <boxGeometry args={[0.4, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="steelblue" 
          metalness={0.5} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="lightgray" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.002) * 0.5]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial 
          color="darkslateblue" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -Math.sin(Date.now() * 0.002) * 0.5]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial 
          color="darkslateblue" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Legs - alternating animation for walking */}
      <mesh position={[-0.15, -0.5, 0]} rotation={[Math.sin(Date.now() * 0.004) * 0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial 
          color="navy" 
          metalness={0.1} 
          roughness={0.7}
        />
      </mesh>
      
      <mesh position={[0.15, -0.5, 0]} rotation={[Math.sin(Date.now() * 0.004 + Math.PI) * 0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial 
          color="navy" 
          metalness={0.1} 
          roughness={0.7}
        />
      </mesh>
    </group>
  );
};

// Navigation visualization component
const NavigationVisualization = ({ path = [], obstacles = [] }) => {
  return (
    <group>
      {/* Planned path visualization */}
      {path.length > 1 && (
        <Line
          points={path}
          color="blue"
          lineWidth={3}
        />
      )}
      
      {/* Destination marker */}
      {path.length > 0 && (
        <mesh position={path[path.length - 1]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="green" 
            emissive="green" 
            emissiveIntensity={0.5}
            transparent 
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* Footstep markers */}
      {path.map((pos, index) => {
        if (index % 2 === 0) { // Show every other point as footstep
          return (
            <mesh key={index} position={[pos[0], pos[1] - 0.95, pos[2]]}>
              <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
              <meshStandardMaterial 
                color="yellow" 
                emissive="yellow" 
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        }
        return null;
      })}
      
      {/* Obstacles */}
      {obstacles.map((obs, index) => (
        <mesh key={index} position={obs.position}>
          <boxGeometry args={[obs.size, obs.size, obs.size]} />
          <meshStandardMaterial 
            color="red" 
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Isaac Navigation Visualization Component
const IsaacNavigationVisualization = () => {
  const { 
    simulationParameters, 
    physicsProperties, 
    simulationRunning,
    startSimulation,
    stopSimulation
  } = useSimulation();
  const [navigationPath, setNavigationPath] = useState([]);
  const [targetPosition, setTargetPosition] = useState([5, 0, 5]);
  const [robotPosition, setRobotPosition] = useState([0, 0, 0]);
  const [obstacles, setObstacles] = useState([
    { position: [2, 0, 2], size: 0.5, passable: false },
    { position: [3, 0, 1], size: 0.8, passable: false }
  ]);
  const [balanceMargin, setBalanceMargin] = useState(0.3);
  const [stepHeight, setStepHeight] = useState(0.2);
  const [gaitPattern, setGaitPattern] = useState('natural-walk');

  // Simulate navigation planning and execution
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(() => {
        // Update robot position towards target
        setRobotPosition(prevPos => {
          const dx = targetPosition[0] - prevPos[0];
          const dz = targetPosition[2] - prevPos[2];
          const dist = Math.sqrt(dx*dx + dz*dz);
          
          if (dist < 0.1) {
            // Reached destination
            return targetPosition;
          }
          
          // Move towards target with bipedal constraints
          const speed = 0.05; // Slower for stability
          const newX = prevPos[0] + (dx/dist) * Math.min(speed, dist);
          const newZ = prevPos[2] + (dz/dist) * Math.min(speed, dist);
          
          return [newX, prevPos[1], newZ];
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, targetPosition]);

  // Calculate path when target changes
  useEffect(() => {
    // Simple straight-line path planning
    const path = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      path.push([
        robotPosition[0] + (targetPosition[0] - robotPosition[0]) * (i/steps),
        robotPosition[1],
        robotPosition[2] + (targetPosition[2] - robotPosition[2]) * (i/steps)
      ]);
    }
    setNavigationPath(path);
  }, [targetPosition, robotPosition]);

  const handleTargetChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const x = parseFloat(formData.get('x'));
    const z = parseFloat(formData.get('z'));
    if (!isNaN(x) && !isNaN(z)) {
      setTargetPosition([x, 0, z]);
    }
  };

  return (
    <div className="simulation-container">
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <h3>Isaac Navigation: Humanoid Navigation Visualization</h3>
        <form onSubmit={handleTargetChange} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label htmlFor="target-x">Target X: </label>
            <input 
              id="target-x"
              type="number" 
              name="x" 
              defaultValue={targetPosition[0]}
              step="0.1"
              min="-10"
              max="10"
            />
          </div>
          <div>
            <label htmlFor="target-z">Target Z: </label>
            <input 
              id="target-z"
              type="number" 
              name="z" 
              defaultValue={targetPosition[2]}
              step="0.1"
              min="-10"
              max="10"
            />
          </div>
          <button type="submit">Set Target</button>
        </form>
        <div style={{ marginTop: '0.5rem' }}>
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
          >
            {simulationRunning ? 'Stop Simulation' : 'Start Simulation'}
          </button>
        </div>
      </div>

      <div style={{ height: '500px', position: 'relative' }}>
        <Canvas
          shadows
          camera={{ position: [10, 8, 10], fov: 50 }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={0.8} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, 5, -10]} intensity={0.3} />
          
          {/* Ground plane with grid */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
              color="olive" 
              roughness={0.8} 
              metalness={0.2}
            />
          </mesh>
          
          {/* Navigation environment */}
          <NavigationEnvironment 
            path={navigationPath} 
            obstacles={obstacles} 
          />
          
          {/* Humanoid robot */}
          <HumanoidNavigationBot 
            position={robotPosition} 
            targetPosition={targetPosition}
          />
          
          {/* Contact shadows */}
          <ContactShadows 
            opacity={0.4} 
            scale={15} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
          
          {/* Environment */}
          <Environment preset="apartment" />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        </Canvas>
        
        {/* Navigation parameters overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          <div>Balance Margin: {balanceMargin.toFixed(2)}m</div>
          <div>Max Step Height: {stepHeight.toFixed(2)}m</div>
          <div>Gait Pattern: {gaitPattern}</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#f8f8f8' }}>
        <h4>Humanoid Navigation Parameters</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>Current Position: [{robotPosition[0].toFixed(2)}, {robotPosition[2].toFixed(2)}]</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Robot coordinates in global frame</div>
          </div>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>Target: [{targetPosition[0].toFixed(2)}, {targetPosition[2].toFixed(2)}]</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Navigation destination</div>
          </div>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>Distance: {Math.sqrt(
              Math.pow(targetPosition[0] - robotPosition[0], 2) +
              Math.pow(targetPosition[2] - robotPosition[2], 2)
            ).toFixed(2)}m</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Remaining distance to target</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsaacNavigationVisualization;