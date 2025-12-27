import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const IMUVisualization = () => {
  const { simulationParameters, simulationRunning } = useSimulation();
  const [imuData, setImuData] = useState({
    orientation: { x: 0.1, y: 0.2, z: 0.3, w: 0.9 },
    acceleration: { x: 0.5, y: -0.2, z: 9.8 },
    gyroscope: { x: 0.01, y: -0.02, z: 0.005 }
  });

  // Animation effect when simulation is running
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(() => {
        setImuData(prev => ({
          orientation: {
            x: prev.orientation.x + (Math.random() - 0.5) * 0.01,
            y: prev.orientation.y + (Math.random() - 0.5) * 0.01,
            z: prev.orientation.z + (Math.random() - 0.5) * 0.01,
            w: prev.orientation.w + (Math.random() - 0.5) * 0.01,
          },
          acceleration: {
            x: prev.acceleration.x + (Math.random() - 0.5) * 0.1,
            y: prev.acceleration.y + (Math.random() - 0.5) * 0.1,
            z: prev.acceleration.z + (Math.random() - 0.5) * 0.1,
          },
          gyroscope: {
            x: prev.gyroscope.x + (Math.random() - 0.5) * 0.001,
            y: prev.gyroscope.y + (Math.random() - 0.5) * 0.001,
            z: prev.gyroscope.z + (Math.random() - 0.5) * 0.001,
          }
        }));
      }, 100); // Update every 100ms
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationRunning]);

  // Normalize quaternion
  const normalizeQuaternion = (q) => {
    const magnitude = Math.sqrt(q.x*q.x + q.y*q.y + q.z*q.z + q.w*q.w);
    return {
      x: q.x / magnitude,
      y: q.y / magnitude,
      z: q.z / magnitude,
      w: q.w / magnitude
    };
  };

  // Convert quaternion to Euler angles
  const quaternionToEuler = (q) => {
    const { x, y, z, w } = normalizeQuaternion(q);
    
    // Roll (x-axis rotation)
    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    const roll = Math.atan2(sinr_cosp, cosr_cosp);
    
    // Pitch (y-axis rotation)
    const sinp = 2 * (w * y - z * x);
    let pitch;
    if (Math.abs(sinp) >= 1) {
      pitch = sinp > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      pitch = Math.asin(sinp);
    }
    
    // Yaw (z-axis rotation)
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
    return {
      roll: roll * 180 / Math.PI,
      pitch: pitch * 180 / Math.PI,
      yaw: yaw * 180 / Math.PI
    };
  };

  const orientationEuler = quaternionToEuler(imuData.orientation);

  return (
    <div className="sensor-card">
      <h4>IMU Sensor Visualization</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <div className="simulation-parameter-group">
          <label>IMU Configuration</label>
          <div>
            <span>Gyroscope Range: ±250°/s</span><br />
            <span>Accelerometer Range: ±2g</span><br />
            <span>Update Rate: 100Hz</span>
          </div>
        </div>
      </div>
      
      <div className="physics-properties">
        {/* Orientation visualization */}
        <div className="property-item">
          <span className="property-label">Orientation (Quaternion)</span>
          <div className="property-value">
            <div>X: {imuData.orientation.x.toFixed(3)}</div>
            <div>Y: {imuData.orientation.y.toFixed(3)}</div>
            <div>Z: {imuData.orientation.z.toFixed(3)}</div>
            <div>W: {imuData.orientation.w.toFixed(3)}</div>
          </div>
        </div>
        
        {/* Euler angles */}
        <div className="property-item">
          <span className="property-label">Orientation (Euler)</span>
          <div className="property-value">
            <div>Roll: {orientationEuler.roll.toFixed(1)}°</div>
            <div>Pitch: {orientationEuler.pitch.toFixed(1)}°</div>
            <div>Yaw: {orientationEuler.yaw.toFixed(1)}°</div>
          </div>
        </div>
        
        {/* Acceleration */}
        <div className="property-item">
          <span className="property-label">Acceleration (m/s²)</span>
          <div className="property-value">
            <div>X: {imuData.acceleration.x.toFixed(3)}</div>
            <div>Y: {imuData.acceleration.y.toFixed(3)}</div>
            <div>Z: {imuData.acceleration.z.toFixed(3)}</div>
          </div>
        </div>
        
        {/* Gyroscope */}
        <div className="property-item">
          <span className="property-label">Gyroscope (rad/s)</span>
          <div className="property-value">
            <div>X: {imuData.gyroscope.x.toFixed(3)}</div>
            <div>Y: {imuData.gyroscope.y.toFixed(3)}</div>
            <div>Z: {imuData.gyroscope.z.toFixed(3)}</div>
          </div>
        </div>
      </div>
      
      {/* 3D visualization of the IMU orientation */}
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h5>3D Orientation Visualization</h5>
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#000000',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* 3D box representation with orientation */}
          <div style={{
            width: '80px',
            height: '120px',
            backgroundColor: 'rgba(30, 144, 255, 0.7)',
            transform: `rotateX(${orientationEuler.pitch}deg) rotateY(${orientationEuler.yaw}deg) rotateZ(${orientationEuler.roll}deg)`,
            transformStyle: 'preserve-3d',
            position: 'relative',
            transition: 'transform 0.1s ease'
          }}>
            {/* Front face */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(30, 144, 255, 0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              backfaceVisibility: 'hidden'
            }}>
              F
            </div>
            {/* Top face */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '20px',
              backgroundColor: 'rgba(0, 100, 200, 0.9)',
              top: '-20px',
              transform: 'rotateX(90deg)',
              transformOrigin: 'bottom',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              backfaceVisibility: 'hidden'
            }}>
              T
            </div>
            {/* Right face */}
            <div style={{
              position: 'absolute',
              width: '20px',
              height: '100%',
              backgroundColor: 'rgba(50, 150, 255, 0.9)',
              right: '-20px',
              transform: 'rotateY(90deg)',
              transformOrigin: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              backfaceVisibility: 'hidden'
            }}>
              R
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            color: 'white',
            fontSize: '10px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '2px 4px',
            borderRadius: '3px'
          }}>
            IMU
          </div>
        </div>
      </div>
    </div>
  );
};

export default IMUVisualization;