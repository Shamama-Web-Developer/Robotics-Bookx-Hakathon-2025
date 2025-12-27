// website/src/context/SimulationContext.js
// Context for managing simulation state across components

import React, { createContext, useContext, useReducer } from 'react';
import { DigitalTwinModel, SimulationParameters, SensorConfiguration, PhysicsProperties } from '../models/DigitalTwinModel';

// Initial state for the simulation context
const initialState = {
  digitalTwinModel: null,
  simulationParameters: new SimulationParameters(),
  sensors: [],
  simulationRunning: false,
  simulationTime: 0,
  physicsProperties: new PhysicsProperties(),
  learningProgress: {
    module: 'digital-twin-robotics',
    chapters: [],
    exercisesCompleted: 0,
    totalExercises: 0,
  },
};

// Action types
const actionTypes = {
  SET_DIGITAL_TWIN_MODEL: 'SET_DIGITAL_TWIN_MODEL',
  UPDATE_SIMULATION_PARAMETERS: 'UPDATE_SIMULATION_PARAMETERS',
  ADD_SENSOR: 'ADD_SENSOR',
  REMOVE_SENSOR: 'REMOVE_SENSOR',
  START_SIMULATION: 'START_SIMULATION',
  STOP_SIMULATION: 'STOP_SIMULATION',
  UPDATE_SIMULATION_TIME: 'UPDATE_SIMULATION_TIME',
  UPDATE_PHYSICS_PROPERTIES: 'UPDATE_PHYSICS_PROPERTIES',
  UPDATE_LEARNING_PROGRESS: 'UPDATE_LEARNING_PROGRESS',
  RESET_SIMULATION: 'RESET_SIMULATION',
};

// Reducer function
const simulationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DIGITAL_TWIN_MODEL:
      return {
        ...state,
        digitalTwinModel: action.payload,
      };
    
    case actionTypes.UPDATE_SIMULATION_PARAMETERS:
      return {
        ...state,
        simulationParameters: {
          ...state.simulationParameters,
          ...action.payload,
        },
      };
    
    case actionTypes.ADD_SENSOR:
      return {
        ...state,
        sensors: [...state.sensors, action.payload],
      };
    
    case actionTypes.REMOVE_SENSOR:
      return {
        ...state,
        sensors: state.sensors.filter(sensor => sensor.id !== action.payload),
      };
    
    case actionTypes.START_SIMULATION:
      return {
        ...state,
        simulationRunning: true,
      };
    
    case actionTypes.STOP_SIMULATION:
      return {
        ...state,
        simulationRunning: false,
      };
    
    case actionTypes.UPDATE_SIMULATION_TIME:
      return {
        ...state,
        simulationTime: action.payload,
      };
    
    case actionTypes.UPDATE_PHYSICS_PROPERTIES:
      return {
        ...state,
        physicsProperties: {
          ...state.physicsProperties,
          ...action.payload,
        },
      };
    
    case actionTypes.UPDATE_LEARNING_PROGRESS:
      return {
        ...state,
        learningProgress: {
          ...state.learningProgress,
          ...action.payload,
        },
      };
    
    case actionTypes.RESET_SIMULATION:
      return initialState;
    
    default:
      return state;
  }
};

// Create context
const SimulationContext = createContext();

// Provider component
export const SimulationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);

  // Actions
  const setDigitalTwinModel = (model) => {
    dispatch({ type: actionTypes.SET_DIGITAL_TWIN_MODEL, payload: model });
  };

  const updateSimulationParameters = (params) => {
    dispatch({ type: actionTypes.UPDATE_SIMULATION_PARAMETERS, payload: params });
  };

  const addSensor = (sensor) => {
    dispatch({ type: actionTypes.ADD_SENSOR, payload: sensor });
  };

  const removeSensor = (sensorId) => {
    dispatch({ type: actionTypes.REMOVE_SENSOR, payload: sensorId });
  };

  const startSimulation = () => {
    dispatch({ type: actionTypes.START_SIMULATION });
  };

  const stopSimulation = () => {
    dispatch({ type: actionTypes.STOP_SIMULATION });
  };

  const updateSimulationTime = (time) => {
    dispatch({ type: actionTypes.UPDATE_SIMULATION_TIME, payload: time });
  };

  const updatePhysicsProperties = (props) => {
    dispatch({ type: actionTypes.UPDATE_PHYSICS_PROPERTIES, payload: props });
  };

  const updateLearningProgress = (progress) => {
    dispatch({ type: actionTypes.UPDATE_LEARNING_PROGRESS, payload: progress });
  };

  const resetSimulation = () => {
    dispatch({ type: actionTypes.RESET_SIMULATION });
  };

  const value = {
    ...state,
    setDigitalTwinModel,
    updateSimulationParameters,
    addSensor,
    removeSensor,
    startSimulation,
    stopSimulation,
    updateSimulationTime,
    updatePhysicsProperties,
    updateLearningProgress,
    resetSimulation,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

// Custom hook to use the simulation context
export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

export default SimulationContext;