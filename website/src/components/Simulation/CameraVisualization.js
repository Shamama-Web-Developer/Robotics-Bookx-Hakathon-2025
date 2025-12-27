import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const CameraVisualization = () => {
  const { simulationParameters, simulationRunning } = useSimulation();
  const [depthData, setDepthData] = useState(Array(64).fill(0).map(() => Array(64).fill(0).map(() => Math.random() * 10)));
  const [pointCloud, setPointCloud] = useState([]);

  // Generate point cloud data from depth map
  useEffect(() => {
    const points = [];
    for (let y = 0; y < depthData.length; y++) {
      for (let x = 0; x < depthData[y].length; x++) {
        // Only include points that are close enough to be interesting
        if (depthData[y][x] < 8) {
          points.push({
            x: (x - depthData[y].length/2) * 0.1, // Scale to reasonable units
            y: (y - depthData[y].length/2) * 0.1,
            z: depthData[y][x],
            intensity: 255 - Math.min(255, depthData[y][x] * 25),
          });
        }
      }
    }
    setPointCloud(points);
  }, [depthData]);

  // Animation effect when simulation is running
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(() => {
        setDepthData(prev => 
          prev.map(row => 
            row.map(value => {
              // Add small random variations to simulate changing depth
              const variation = (Math.random() - 0.5) * 0.2;
              return Math.max(0.1, value + variation);
            })
          )
        );
      }, 200); // Update every 200ms
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationRunning]);

  // Function to render a simple 2D depth map visualization
  const renderDepthMap = () => {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${depthData[0].length}, 1fr)`, 
        gap: '0px',
        width: '300px',
        height: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {depthData.flat().map((value, index) => {
          // Map depth value to color (blue for close, red for far)
          const hue = 240 - Math.min(value * 20, 240); // Hue from blue to red
          const saturation = 100;
          const lightness = Math.max(20, 80 - value * 5); // Vary lightness based on depth
          
          return (
            <div
              key={index}
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                border: '0px'
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="sensor-card">
      <h4>Depth Camera Visualization</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <div className="simulation-parameter-group">
          <label>Camera Configuration</label>
          <div>
            <span>Resolution: 640×480</span><br />
            <span>Field of View: 60°</span><br />
            <span>Depth Range: 0.3m - 8m</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Depth Map Visualization */}
        <div>
          <h5>Depth Map</h5>
          {renderDepthMap()}
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Total Points: {pointCloud.length}
          </p>
        </div>
        
        {/* Point Cloud Projection */}
        <div>
          <h5>Point Cloud (Top View)</h5>
          <div style={{ 
            width: '300px', 
            height: '300px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            position: 'relative',
            backgroundColor: '#000',
            overflow: 'hidden'
          }}>
            {pointCloud.map((point, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${50 + (point.x / 3) * 100}%`,
                  top: `${50 + (point.z / 8) * 100}%`, // Use z as vertical for top view
                  width: '2px',
                  height: '2px',
                  backgroundColor: `rgb(${Math.min(255, point.intensity)}, ${Math.min(255, point.intensity/2)}, 0)`,
                  borderRadius: '50%'
                }}
              />
            ))}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              backgroundColor: '#00f',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #fff'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '5px',
                color: '#fff',
                fontSize: '10px',
                whiteSpace: 'nowrap'
              }}>
                Camera
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Camera View Frustum Visualization */}
      <div style={{ marginTop: '1rem' }}>
        <h5>Camera View Frustum</h5>
        <div style={{ 
          width: '100%', 
          height: '150px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          position: 'relative',
          backgroundColor: '#f0f8ff',
          overflow: 'hidden'
        }}>
          {/* Camera origin */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            width: '20px',
            height: '20px',
            backgroundColor: '#00f',
            borderRadius: '50%',
            transform: 'translateY(-50%)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '5px',
              color: '#000',
              fontSize: '12px'
            }}>
              Cam
            </div>
          </div>
          
          {/* View frustum */}
          <div style={{
            position: 'absolute',
            left: '40px',
            top: '0',
            width: '0',
            height: '0',
            borderLeft: '240px solid transparent',
            borderRight: '240px solid transparent',
            borderTop: '150px solid rgba(0, 0, 255, 0.1)',
            transform: 'translateX(-50%)'
          }} />
          
          {/* Objects in view */}
          {Array.from({ length: 8 }).map((_, i) => {
            const left = 100 + i * 60;
            const top = 30 + (i % 3) * 40;
            const size = 10 + Math.random() * 15;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: `rgba(255, ${100 + i * 15}, 0, 0.7)`,
                  borderRadius: '4px'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CameraVisualization;