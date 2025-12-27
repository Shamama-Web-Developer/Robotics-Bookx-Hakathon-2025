import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useSimulation } from '../../context/SimulationContext';

// Robot model with Isaac ROS perception visualization
const IsaacROSRobot = ({ position = [0, 0, 0] }) => {
  const { simulationParameters, physicsProperties } = useSimulation();
  const robotRef = useRef();

  // Animation effect
  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <group ref={robotRef} position={position}>
      {/* Torso with perception sensors */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial 
          color="darkblue" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Head with camera sensors */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="lightgray" 
          metalness={0.1} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Camera sensors */}
      <mesh position={[0, 1.2, 0.31]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-0.1, 1.1, 0.31]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 32]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={[0.1, 1.1, 0.31]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 32]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.3} />
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

// Visualization of perception fields for Isaac ROS
const PerceptionVisualization = ({ robotPosition = [0, 0, 0] }) => {
  const { simulationParameters } = useSimulation();
  
  // Generate perception beams based on current parameters
  const [beams, setBeams] = useState([]);
  
  useEffect(() => {
    // Create perception field visualization
    const newBeams = [];
    const beamsCount = 8;
    const beamLength = simulationParameters.isaacRos?.perceptionRange || 3.0;
    
    for (let i = 0; i < beamsCount; i++) {
      const angle = (i / beamsCount) * Math.PI * 2;
      const endX = robotPosition[0] + Math.cos(angle) * beamLength;
      const endZ = robotPosition[2] + Math.sin(angle) * beamLength;
      
      newBeams.push({
        id: i,
        start: [robotPosition[0], robotPosition[1], robotPosition[2]],
        end: [endX, robotPosition[1], endZ],
        color: `hsl(${120 + i * 10}, 70%, 60%)`
      });
    }
    
    setBeams(newBeams);
  }, [simulationParameters.isaacRos?.perceptionRange, robotPosition]);

  return (
    <group>
      {beams.map(beam => (
        <line key={beam.id}>
          <bufferGeometry attach="geometry" vertices={new Float32Array([
            ...beam.start,
            ...beam.end
          ])} />
          <lineBasicMaterial attach="material" color={beam.color} linewidth={1} />
        </line>
      ))}
      
      {/* Field of view cones */}
      <mesh position={robotPosition}>
        <coneGeometry args={[0.5, 2, 16, 1, true]} />
        <meshStandardMaterial 
          color="cyan" 
          transparent 
          opacity={0.2} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Main Isaac ROS Visualization Component with hardware acceleration indicators
const IsaacROSVisualization = () => {
  const { 
    simulationParameters, 
    physicsProperties, 
    simulationRunning,
    startSimulation,
    stopSimulation
  } = useSimulation();
  const [accelerationStatus, setAccelerationStatus] = useState('active');
  const [gpuUtilization, setGpuUtilization] = useState(75);
  const [sensorDataRate, setSensorDataRate] = useState(30);

  // Simulate hardware acceleration indicators
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(() => {
        // Simulate GPU utilization fluctuations
        setGpuUtilization(prev => Math.max(30, Math.min(95, prev + (Math.random() * 10 - 5))));
        // Simulate sensor data rate changes
        setSensorDataRate(prev => Math.max(15, Math.min(60, prev + (Math.random() * 4 - 2))));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationRunning]);

  return (
    <div className="simulation-container">
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <h3>Isaac ROS: Accelerated Perception Visualization</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <p>Acceleration Status: <span style={{ fontWeight: 'bold', color: accelerationStatus === 'active' ? 'green' : 'red' }}>{accelerationStatus}</span></p>
          <p>GPU Utilization: {gpuUtilization.toFixed(1)}%</p>
          <p>Sensor Data Rate: {sensorDataRate.toFixed(1)} Hz</p>
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
          camera={{ position: [8, 5, 8], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={1} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <IsaacROSRobot position={[0, 1, 0]} />
          <PerceptionVisualization robotPosition={[0, 1, 0]} />
          
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
          
          <Environment preset="apartment" />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        </Canvas>
        
        {/* Hardware acceleration indicator overlay */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          <div>CUDA Cores: Active</div>
          <div>Tensor Cores: Active</div>
          <div>RT Cores: Active</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#f8f8f8' }}>
        <h4>Hardware Acceleration Metrics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>Perception Speedup: 15x</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>vs. CPU-only processing</div>
          </div>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>VSLAM Processing: 30 FPS</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Real-time visual odometry</div>
          </div>
          <div style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>AI Inference: 25ms</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Object detection & tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsaacROSVisualization;