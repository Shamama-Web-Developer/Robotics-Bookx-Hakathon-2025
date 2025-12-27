import React from 'react';
import { useSimulation } from '../../context/SimulationContext';

const PhysicsParameters = () => {
  const {
    simulationParameters,
    physicsProperties,
    updateSimulationParameters,
    updatePhysicsProperties
  } = useSimulation();

  const handleGravityChange = (e) => {
    updateSimulationParameters({
      gravity: parseFloat(e.target.value)
    });
  };

  const handleCollisionModelChange = (e) => {
    updateSimulationParameters({
      collisionModel: e.target.value
    });
  };

  const handleTerrainChange = (e) => {
    updateSimulationParameters({
      environment: {
        ...simulationParameters.environment,
        terrain: e.target.value
      }
    });
  };

  const handleFrictionChange = (e) => {
    updatePhysicsProperties({
      friction: parseFloat(e.target.value)
    });
  };

  const handleRestitutionChange = (e) => {
    updatePhysicsProperties({
      restitution: parseFloat(e.target.value)
    });
  };

  const handleTimeStepChange = (e) => {
    updateSimulationParameters({
      timeStep: parseFloat(e.target.value)
    });
  };

  const handleMassChange = (e) => {
    updatePhysicsProperties({
      mass: parseFloat(e.target.value)
    });
  };

  return (
    <div className="simulation-controls">
      <div className="simulation-parameter-group">
        <label htmlFor="gravity">Gravity (m/s²)</label>
        <input
          id="gravity"
          type="range"
          min="0"
          max="20"
          step="0.1"
          value={simulationParameters.gravity}
          onChange={handleGravityChange}
        />
        <div>{simulationParameters.gravity.toFixed(2)} m/s²</div>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="collision-model">Collision Model</label>
        <select
          id="collision-model"
          value={simulationParameters.collisionModel}
          onChange={handleCollisionModelChange}
        >
          <option value="elastic">Elastic</option>
          <option value="inelastic">Inelastic</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="terrain">Terrain Type</label>
        <select
          id="terrain"
          value={simulationParameters.environment.terrain}
          onChange={handleTerrainChange}
        >
          <option value="flat">Flat</option>
          <option value="hilly">Hilly</option>
          <option value="obstacle-course">Obstacle Course</option>
        </select>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="friction">Friction Coefficient</label>
        <input
          id="friction"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={physicsProperties.friction}
          onChange={handleFrictionChange}
        />
        <div>{physicsProperties.friction.toFixed(2)}</div>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="restitution">Restitution (Bounciness)</label>
        <input
          id="restitution"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={physicsProperties.restitution}
          onChange={handleRestitutionChange}
        />
        <div>{physicsProperties.restitution.toFixed(2)}</div>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="time-step">Time Step (s)</label>
        <input
          id="time-step"
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={simulationParameters.timeStep}
          onChange={handleTimeStepChange}
        />
        <div>{simulationParameters.timeStep.toFixed(3)} s</div>
      </div>

      <div className="simulation-parameter-group">
        <label htmlFor="mass">Robot Mass (kg)</label>
        <input
          id="mass"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={physicsProperties.mass}
          onChange={handleMassChange}
        />
        <div>{physicsProperties.mass.toFixed(1)} kg</div>
      </div>
    </div>
  );
};

export default PhysicsParameters;