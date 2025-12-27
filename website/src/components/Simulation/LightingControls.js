import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const LightingControls = () => {
  const { simulationParameters } = useSimulation();
  const [lightIntensity, setLightIntensity] = useState(1);
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [showShadows, setShowShadows] = useState(true);
  const [shadowQuality, setShadowQuality] = useState('medium');

  // Update simulation parameters when lighting changes
  const handleIntensityChange = (newIntensity) => {
    setLightIntensity(newIntensity);
    // In a real implementation, we would update simulation parameters
    console.log(`Light intensity updated to: ${newIntensity}`);
  };

  const handleAmbientChange = (newAmbient) => {
    setAmbientIntensity(newAmbient);
    console.log(`Ambient intensity updated to: ${newAmbient}`);
  };

  const handleColorChange = (newColor) => {
    setLightColor(newColor);
    console.log(`Light color updated to: ${newColor}`);
  };

  return (
    <div className="simulation-parameter-group">
      <h4>Lighting Controls</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="main-light-intensity">Main Light Intensity: {lightIntensity.toFixed(1)}</label>
        <input
          id="main-light-intensity"
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={lightIntensity}
          onChange={(e) => handleIntensityChange(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="ambient-light-intensity">Ambient Light Intensity: {ambientIntensity.toFixed(1)}</label>
        <input
          id="ambient-light-intensity"
          type="range"
          min="0.0"
          max="1"
          step="0.05"
          value={ambientIntensity}
          onChange={(e) => handleAmbientChange(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="light-color">Light Color</label>
        <input
          id="light-color"
          type="color"
          value={lightColor}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{ width: '100%', height: '30px' }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={showShadows}
            onChange={(e) => setShowShadows(e.target.checked)}
          />
          Enable Shadows
        </label>
      </div>
      
      {showShadows && (
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="shadow-quality">Shadow Quality</label>
          <select
            id="shadow-quality"
            value={shadowQuality}
            onChange={(e) => setShadowQuality(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="low">Low (Performance)</option>
            <option value="medium">Medium</option>
            <option value="high">High (Quality)</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default LightingControls;