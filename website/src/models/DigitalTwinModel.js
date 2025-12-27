// website/src/models/DigitalTwinModel.js
// Data model for digital twin robotics entities

// Model for a digital twin robot
export class DigitalTwinModel {
  constructor({
    id,
    name,
    description,
    simulationParameters,
    sensorConfigurations,
    physicsProperties,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.simulationParameters = simulationParameters || {};
    this.sensorConfigurations = sensorConfigurations || [];
    this.physicsProperties = physicsProperties || {};
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Update model parameters
  updateParameters(newParameters) {
    this.simulationParameters = { ...this.simulationParameters, ...newParameters };
    this.updatedAt = new Date();
  }

  // Add a sensor configuration
  addSensorConfiguration(sensor) {
    this.sensorConfigurations.push(sensor);
    this.updatedAt = new Date();
  }
}

// Model for simulation parameters
export class SimulationParameters {
  constructor({
    gravity = 9.81,
    collisionModel = 'elastic',
    environment = { terrain: 'flat', objects: [] },
    timeStep = 0.01,
    accuracy = 0.99,
  }) {
    this.gravity = gravity;
    this.collisionModel = collisionModel;
    this.environment = environment;
    this.timeStep = timeStep;
    this.accuracy = accuracy;
    this.updatedAt = new Date();
  }

  updateEnvironment(newEnvironment) {
    this.environment = { ...this.environment, ...newEnvironment };
    this.updatedAt = new Date();
  }
}

// Model for sensor configurations
export class SensorConfiguration {
  constructor({
    id,
    type,
    position,
    parameters,
    noiseModel,
    accuracyMetrics,
  }) {
    this.id = id;
    this.type = type; // 'lidar', 'camera', 'imu', etc.
    this.position = position || { x: 0, y: 0, z: 0 };
    this.parameters = parameters || {};
    this.noiseModel = noiseModel || 'gaussian';
    this.accuracyMetrics = accuracyMetrics || {};
    this.createdAt = new Date();
  }

  updateParameters(newParameters) {
    this.parameters = { ...this.parameters, ...newParameters };
  }
}

// Model for physics properties
export class PhysicsProperties {
  constructor({
    mass = 1.0,
    friction = 0.5,
    restitution = 0.3,
    linearDamping = 0.01,
    angularDamping = 0.01,
  }) {
    this.mass = mass;
    this.friction = friction;
    this.restitution = restitution;
    this.linearDamping = linearDamping;
    this.angularDamping = angularDamping;
  }

  updateProperties(newProperties) {
    Object.assign(this, newProperties);
  }
}