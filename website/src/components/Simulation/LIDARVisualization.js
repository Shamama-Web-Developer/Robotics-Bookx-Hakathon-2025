import React, { useEffect, useRef } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const LIDARVisualization = () => {
  const { simulationParameters, simulationRunning } = useSimulation();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Sample LiDAR data
  const [lidarData, setLidarData] = React.useState([1.2, 0.8, 1.5, 2.1, 1.8, 1.0, 0.7, 1.3, 2.2, 1.9, 1.6, 1.1, 0.9, 1.4, 2.0, 1.7]);

  // Function to draw the LIDAR visualization
  const drawLIDAR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDistance = 3; // meters
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let r = 0; r <= maxDistance; r += 0.5) {
      const radius = (r / maxDistance) * Math.min(width, height) * 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw angle markers
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const x1 = centerX + Math.cos(rad) * 10;
      const y1 = centerY + Math.sin(rad) * 10;
      const x2 = centerX + Math.cos(rad) * (Math.min(width, height) * 0.4);
      const y2 = centerY + Math.sin(rad) * (Math.min(width, height) * 0.4);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // Draw LiDAR points
    const angleStep = 360 / lidarData.length;
    for (let i = 0; i < lidarData.length; i++) {
      const angle = (i * angleStep - 90) * (Math.PI / 180); // Start from top
      const distance = lidarData[i];
      
      // Calculate position based on distance and angle
      const x = centerX + Math.cos(angle) * (distance / maxDistance) * (Math.min(width, height) * 0.4);
      const y = centerY + Math.sin(angle) * (distance / maxDistance) * (Math.min(width, height) * 0.4);
      
      // Draw point
      const intensity = Math.min(255, Math.max(0, 255 - (distance / maxDistance) * 200));
      ctx.fillStyle = `rgb(255, ${intensity}, 0)`;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw distance indicator
      ctx.fillStyle = '#333333';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      if (distance < maxDistance * 0.8) { // Only label points that are not too far
        ctx.fillText(distance.toFixed(2) + 'm', x, y - 8);
      }
    }
    
    // Draw center point
    ctx.fillStyle = '#0000ff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add labels
    ctx.fillStyle = '#333333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LiDAR Visualization', centerX, 20);
  };

  // Animation effect when simulation is running
  useEffect(() => {
    if (simulationRunning) {
      animationRef.current = setInterval(() => {
        // Update LiDAR data with small variations to simulate sensor readings
        setLidarData(prev => prev.map(distance => {
          // Add small random variation to simulate sensor noise
          const variation = (Math.random() - 0.5) * 0.1;
          return Math.max(0.1, distance + variation);
        }));
      }, 100); // Update every 100ms
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [simulationRunning]);

  // Redraw when LiDAR data changes
  useEffect(() => {
    drawLIDAR();
  }, [lidarData]);

  return (
    <div className="sensor-card">
      <h4>LiDAR Sensor Visualization</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <div className="simulation-parameter-group">
          <label>LiDAR Configuration</label>
          <div>
            <span>Resolution: 16 beams</span><br />
            <span>Range: 0.15m - 3m</span><br />
            <span>Update Rate: 10Hz</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{ border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        />
        
        <div style={{ marginTop: '1rem', textAlign: 'center', width: '100%' }}>
          <h5>Real-time Distance Readings</h5>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '0.5rem',
            maxHeight: '100px',
            overflowY: 'auto'
          }}>
            {lidarData.map((distance, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '0.25rem 0.5rem', 
                  backgroundColor: '#e3f2fd', 
                  borderRadius: '4px',
                  border: '1px solid #bbdefb'
                }}
              >
                {index}: {distance.toFixed(2)}m
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LIDARVisualization;