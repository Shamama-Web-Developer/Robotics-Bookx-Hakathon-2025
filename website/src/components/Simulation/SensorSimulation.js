import React, { useState, useEffect, memo, useCallback } from 'react';
import { useSimulation } from '../../context/SimulationContext';

// Function to add realistic noise to sensor data
const addRealisticNoise = (value, noiseLevel, noiseType = 'gaussian') => {
  if (noiseType === 'gaussian') {
    // Box-Muller transform to generate Gaussian noise
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return value + gaussian * noiseLevel;
  } else if (noiseType === 'uniform') {
    // Uniform noise distribution
    return value + (Math.random() - 0.5) * 2 * noiseLevel;
  } else {
    // No noise
    return value;
  }
};

// Function to simulate drift in sensor readings
const addDrift = (value, timeStep, driftRate) => {
  return value + driftRate * timeStep;
};

// Memoized sensor display components to optimize rendering
const LiDARDisplay = memo(({ sensorData }) => (
  <div className="sensor-card">
    <h4>LiDAR Sensor</h4>
    <div style={{ marginBottom: '1rem' }}>
      <p><strong>Resolution:</strong> {sensorData.lidar.resolution}</p>
      <p><strong>Accuracy:</strong> {sensorData.lidar.accuracy}</p>
      <p><strong>Noise Model:</strong> {sensorData.lidar.noiseModel} (Level: {sensorData.lidar.noiseLevel})</p>
    </div>
    <div>
      <h5>Distance Readings (m):</h5>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        gap: '0.5rem'
      }}>
        {sensorData.lidar.distances.map((dist, index) => (
          <div
            key={index}
            style={{
              padding: '0.5rem',
              backgroundColor: `hsl(${240 - dist * 40}, 70%, 70%)`,
              borderRadius: '4px',
              textAlign: 'center',
              border: '1px solid #ccc'
            }}
          >
            {dist.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  </div>
));

const IMUDisplay = memo(({ sensorData }) => (
  <div className="sensor-card">
    <h4>IMU Sensor</h4>

    <div className="physics-properties" style={{ marginBottom: '1rem' }}>
      <div className="property-item">
        <span className="property-label">Orientation</span>
        <div className="property-value">
          <div>X: {sensorData.imu.orientation.x.toFixed(3)}</div>
          <div>Y: {sensorData.imu.orientation.y.toFixed(3)}</div>
          <div>Z: {sensorData.imu.orientation.z.toFixed(3)}</div>
          <div>W: {sensorData.imu.orientation.w.toFixed(3)}</div>
        </div>
      </div>

      <div className="property-item">
        <span className="property-label">Acceleration (m/s²)</span>
        <div className="property-value">
          <div>X: {sensorData.imu.acceleration.x.toFixed(3)}</div>
          <div>Y: {sensorData.imu.acceleration.y.toFixed(3)}</div>
          <div>Z: {sensorData.imu.acceleration.z.toFixed(3)}</div>
        </div>
      </div>

      <div className="property-item">
        <span className="property-label">Gyroscope (rad/s)</span>
        <div className="property-value">
          <div>X: {sensorData.imu.gyroscope.x.toFixed(3)}</div>
          <div>Y: {sensorData.imu.gyroscope.y.toFixed(3)}</div>
          <div>Z: {sensorData.imu.gyroscope.z.toFixed(3)}</div>
        </div>
      </div>
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <p><strong>Noise Model:</strong> {sensorData.imu.noiseModel} (Level: {sensorData.imu.noiseLevel})</p>
    </div>
  </div>
));

const DepthCameraDisplay = memo(({ sensorData }) => (
  <div className="sensor-card">
    <h4>Depth Camera</h4>
    <div style={{ marginBottom: '1rem' }}>
      <p><strong>Resolution:</strong> {sensorData.depthCamera.resolution}</p>
      <p><strong>Field of View:</strong> {sensorData.depthCamera.fov}°</p>
      <p><strong>Noise Model:</strong> {sensorData.depthCamera.noiseModel} (Level: {sensorData.depthCamera.noiseLevel})</p>
    </div>
    <div>
      <p><strong>Depth Map Preview:</strong></p>
      <div
        style={{
          height: '200px',
          width: '100%',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          gap: '1px',
          width: '90%',
          height: '90%'
        }}>
          {Array.from({ length: 100 }).map((_, i) => {
            // Generate a simple depth visualization with noise
            const baseDepth = Math.random() * 10; // Random base depth
            const noisyDepth = addRealisticNoise(baseDepth, sensorData.depthCamera.noiseLevel, sensorData.depthCamera.noiseModel);
            const clampedDepth = Math.max(0, Math.min(10, noisyDepth)); // Clamp to reasonable range
            const hue = 240 - Math.min(clampedDepth * 10, 240); // Map depth to hue
            return (
              <div
                key={i}
                style={{
                  backgroundColor: `hsl(${hue}, 70%, 70%)`,
                  borderRadius: '1px'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  </div>
));

// Component to visualize sensor simulation data
const SensorSimulation = memo(() => {
  const { simulationParameters, simulationRunning } = useSimulation();
  const [sensorData, setSensorData] = useState({
    lidar: {
      distances: [1.2, 0.8, 1.5, 2.1, 1.8, 1.0, 0.7, 1.3],
      resolution: "360deg",
      accuracy: "0.01m",
      noiseModel: "gaussian",
      noiseLevel: 0.02
    },
    depthCamera: {
      depthMap: "base64_encoded_data",
      resolution: "640x480",
      fov: 60,
      noiseModel: "gaussian",
      noiseLevel: 0.05
    },
    imu: {
      orientation: { x: 0.1, y: 0.2, z: 0.3, w: 0.9 },
      acceleration: { x: 0.5, y: -0.2, z: 9.8 },
      gyroscope: { x: 0.01, y: -0.02, z: 0.005 },
      noiseModel: "gaussian",
      noiseLevel: 0.001,
      drift: { x: 0, y: 0, z: 0 }
    }
  });

  // Memoize the sensor update function to prevent unnecessary re-renders
  const updateSensorData = useCallback(() => {
    setSensorData(prev => ({
      ...prev,
      lidar: {
        ...prev.lidar,
        distances: prev.lidar.distances.map(d => {
          // Add realistic noise to the distances
          const noisyValue = addRealisticNoise(d, prev.lidar.noiseLevel, prev.lidar.noiseModel);
          return Math.max(0.1, noisyValue); // Ensure positive distance
        })
      },
      imu: {
        ...prev.imu,
        orientation: {
          x: addRealisticNoise(prev.imu.orientation.x, prev.imu.noiseLevel, prev.imu.noiseModel),
          y: addRealisticNoise(prev.imu.orientation.y, prev.imu.noiseLevel, prev.imu.noiseModel),
          z: addRealisticNoise(prev.imu.orientation.z, prev.imu.noiseLevel, prev.imu.noiseModel),
          w: addRealisticNoise(prev.imu.orientation.w, prev.imu.noiseLevel, prev.imu.noiseModel),
        },
        acceleration: {
          x: addRealisticNoise(prev.imu.acceleration.x, prev.imu.noiseLevel, prev.imu.noiseModel),
          y: addRealisticNoise(prev.imu.acceleration.y, prev.imu.noiseLevel, prev.imu.noiseModel),
          z: addRealisticNoise(prev.imu.acceleration.z, prev.imu.noiseLevel * 0.2, prev.imu.noiseModel), // Gravity has less noise
        },
        gyroscope: {
          x: addRealisticNoise(prev.imu.gyroscope.x, prev.imu.noiseLevel, prev.imu.noiseModel),
          y: addRealisticNoise(prev.imu.gyroscope.y, prev.imu.noiseLevel, prev.imu.noiseModel),
          z: addRealisticNoise(prev.imu.gyroscope.z, prev.imu.noiseLevel, prev.imu.noiseModel),
        }
      }
    }));
  }, []);

  // Simulate sensor data updates when the simulation is running
  useEffect(() => {
    let interval;
    let timeStep = 0; // Track time for drift simulation
    if (simulationRunning) {
      // Optimize interval based on time step to reduce CPU usage
      const intervalTime = Math.max(50, 100); // Minimum 20 FPS for sensor updates
      interval = setInterval(() => {
        timeStep += 0.1; // Update time step by 100ms
        updateSensorData();
      }, intervalTime);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationRunning, updateSensorData]);

  return (
    <div className="simulation-container" role="region" aria-label="Sensor Simulation Dashboard">
      <div
        style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}
        role="banner"
      >
        <h3>Sensor Simulation Dashboard</h3>
        <p>Status: {simulationRunning ? 'Running' : 'Stopped'}</p>
      </div>

      <div className="sensor-data-display" role="main">
        {/* LiDAR Visualization */}
        <LiDARDisplay sensorData={sensorData} />

        {/* IMU Visualization */}
        <IMUDisplay sensorData={sensorData} />

        {/* Depth Camera Visualization */}
        <DepthCameraDisplay sensorData={sensorData} />
      </div>
    </div>
  );
});

export default SensorSimulation;