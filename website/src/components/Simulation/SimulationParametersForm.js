import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const SimulationParametersForm = () => {
  const { 
    simulationParameters, 
    physicsProperties, 
    updateSimulationParameters, 
    updatePhysicsProperties 
  } = useSimulation();
  
  // Local state for form values
  const [formData, setFormData] = useState({
    // Isaac Sim parameters
    gravity: 9.81,
    friction: 0.5,
    restitution: 0.3,
    timeStep: 0.01,
    solverIterations: 8,
    // Isaac ROS parameters
    accelerationEnabled: true,
    sensorNoise: 0.01,
    // Nav2 parameters
    navigationFrequency: 5.0,
    controllerFrequency: 20.0
  });

  // Initialize form data from context
  useEffect(() => {
    setFormData({
      gravity: simulationParameters.isaacSim?.gravity || 9.81,
      friction: physicsProperties.isaacSim?.friction || 0.5,
      restitution: physicsProperties.isaacSim?.restitution || 0.3,
      timeStep: simulationParameters.isaacSim?.timeStep || 0.01,
      solverIterations: simulationParameters.isaacSim?.solverIterations || 8,
      accelerationEnabled: simulationParameters.isaacRos?.accelerationEnabled ?? true,
      sensorNoise: simulationParameters.isaacRos?.sensorNoise || 0.01,
      navigationFrequency: simulationParameters.nav2?.navigationFrequency || 5.0,
      controllerFrequency: simulationParameters.nav2?.controllerFrequency || 20.0
    });
  }, [simulationParameters, physicsProperties]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : 
                    name.includes('frequency') || name.includes('gravity') || 
                    name.includes('friction') || name.includes('restitution') || 
                    name.includes('timeStep') || name.includes('sensorNoise') ? 
                    parseFloat(value) : 
                    value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update Isaac Sim parameters
    updateSimulationParameters({
      isaacSim: {
        gravity: formData.gravity,
        timeStep: formData.timeStep,
        solverIterations: formData.solverIterations
      }
    });
    
    updatePhysicsProperties({
      isaacSim: {
        friction: formData.friction,
        restitution: formData.restitution
      }
    });
    
    // Update Isaac ROS parameters
    updateSimulationParameters({
      isaacRos: {
        accelerationEnabled: formData.accelerationEnabled,
        sensorNoise: formData.sensorNoise
      }
    });
    
    // Update Nav2 parameters
    updateSimulationParameters({
      nav2: {
        navigationFrequency: formData.navigationFrequency,
        controllerFrequency: formData.controllerFrequency
      }
    });
    
    alert('Simulation parameters updated successfully!');
  };

  return (
    <div className="simulation-parameters-form">
      <h3>Simulation Parameters</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Isaac Sim Parameters</h4>
          
          <div className="form-group">
            <label htmlFor="gravity">
              Gravity (m/s²): {formData.gravity.toFixed(2)}
            </label>
            <input
              id="gravity"
              name="gravity"
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={formData.gravity}
              onChange={handleChange}
            />
            <div className="form-help">
              Adjusts gravitational acceleration (Earth: 9.81 m/s²)
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="friction">
              Friction Coefficient: {formData.friction.toFixed(2)}
            </label>
            <input
              id="friction"
              name="friction"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={formData.friction}
              onChange={handleChange}
            />
            <div className="form-help">
              Controls surface friction (0 = no friction, 1 = high friction)
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="restitution">
              Restitution: {formData.restitution.toFixed(2)}
            </label>
            <input
              id="restitution"
              name="restitution"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={formData.restitution}
              onChange={handleChange}
            />
            <div className="form-help">
              Controls elasticity (0 = inelastic, 1 = perfectly elastic)
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="timeStep">
              Time Step (s): {formData.timeStep.toFixed(3)}
            </label>
            <input
              id="timeStep"
              name="timeStep"
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={formData.timeStep}
              onChange={handleChange}
            />
            <div className="form-help">
              Simulation time step (smaller = more accurate but slower)
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="solverIterations">
              Solver Iterations: {formData.solverIterations}
            </label>
            <input
              id="solverIterations"
              name="solverIterations"
              type="range"
              min="1"
              max="32"
              step="1"
              value={formData.solverIterations}
              onChange={handleChange}
            />
            <div className="form-help">
              Physics solver iterations (more = more stable but slower)
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h4>Isaac ROS Parameters</h4>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="accelerationEnabled"
                checked={formData.accelerationEnabled}
                onChange={handleChange}
              />
              Hardware Acceleration Enabled
            </label>
            <div className="form-help">
              Enable GPU acceleration for perception pipelines
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="sensorNoise">
              Sensor Noise Level: {formData.sensorNoise.toFixed(3)}
            </label>
            <input
              id="sensorNoise"
              name="sensorNoise"
              type="range"
              min="0"
              max="0.1"
              step="0.001"
              value={formData.sensorNoise}
              onChange={handleChange}
            />
            <div className="form-help">
              Adjusts simulated sensor noise level
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h4>Nav2 Parameters</h4>
          
          <div className="form-group">
            <label htmlFor="navigationFrequency">
              Navigation Frequency (Hz): {formData.navigationFrequency.toFixed(1)}
            </label>
            <input
              id="navigationFrequency"
              name="navigationFrequency"
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={formData.navigationFrequency}
              onChange={handleChange}
            />
            <div className="form-help">
              Frequency of navigation updates (higher = more responsive)
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="controllerFrequency">
              Controller Frequency (Hz): {formData.controllerFrequency.toFixed(1)}
            </label>
            <input
              id="controllerFrequency"
              name="controllerFrequency"
              type="range"
              min="10"
              max="100"
              step="1"
              value={formData.controllerFrequency}
              onChange={handleChange}
            />
            <div className="form-help">
              Frequency of motion control updates (higher = more precise)
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          Update Parameters
        </button>
      </form>
    </div>
  );
};

export default SimulationParametersForm;