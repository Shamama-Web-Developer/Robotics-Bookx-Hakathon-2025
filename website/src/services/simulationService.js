// website/src/services/simulationService.js
// Service layer for simulation API endpoints

// Get simulation parameters
export const getSimulationParameters = async () => {
  // For now, return default parameters until we have a real backend
  return {
    gravity: {
      value: 9.81,
      unit: "m/s^2",
      range: { min: 0, max: 20, step: 0.1 }
    },
    collisionModel: {
      options: ["elastic", "inelastic", "custom"],
      default: "elastic"
    },
    environment: {
      terrain: ["flat", "hilly", "obstacle-course"],
      objects: ["box", "sphere", "cylinder"]
    },
    timeStep: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001
    }
  };
};

// Update simulation parameters
export const updateSimulationParameters = async (parameters) => {
  // For now, simulate an update with a mock response
  console.log('Updating simulation parameters:', parameters);
  return {
    status: 'updated',
    timestamp: new Date().toISOString(),
    parameters
  };
};

// Get sensor data
export const getSensorData = async () => {
  // For now, return mock sensor data until we have a real backend
  return {
    lidar: {
      distances: [1.2, 0.8, 1.5, 2.1, 1.8, 1.0, 0.7, 1.3],
      resolution: "360deg",
      accuracy: "0.01m"
    },
    depthCamera: {
      depthMap: "base64_encoded_data",
      resolution: "640x480",
      fov: 60
    },
    imu: {
      orientation: { x: 0.1, y: 0.2, z: 0.3, w: 0.9 },
      acceleration: { x: 0.5, y: -0.2, z: 9.8 },
      gyroscope: { x: 0.01, y: -0.02, z: 0.005 }
    }
  };
};

// Get learning progress
export const getLearningProgress = async () => {
  // For now, return mock progress data until we have a real backend
  return {
    module: "digital-twin-robotics",
    chapters: [
      {
        title: "Physics Simulation",
        completed: false,
        completionDate: null
      },
      {
        title: "High-Fidelity Twins",
        completed: false,
        estimatedTimeRemaining: 45
      },
      {
        title: "Sensor Simulation",
        completed: false,
        estimatedTimeRemaining: 60
      }
    ],
    exercisesCompleted: 0,
    totalExercises: 7
  };
};

// Update learning progress
export const updateLearningProgress = async (progressData) => {
  // For now, simulate an update with a mock response
  console.log('Updating learning progress:', progressData);
  return {
    status: 'progress saved',
    timestamp: new Date().toISOString()
  };
};

// Additional physics-specific functions
// Get physics properties
export const getPhysicsProperties = async () => {
  return {
    mass: { value: 1.0, min: 0.1, max: 10, step: 0.1 },
    friction: { value: 0.5, min: 0, max: 1, step: 0.01 },
    restitution: { value: 0.3, min: 0, max: 1, step: 0.01 },
    linearDamping: { value: 0.01, min: 0, max: 1, step: 0.001 },
    angularDamping: { value: 0.01, min: 0, max: 1, step: 0.001 }
  };
};

// Sensor simulation functions
// Get LiDAR data
export const getLidarData = async () => {
  // For now, return mock LiDAR data until we have a real backend
  const distances = Array.from({ length: 36 }, () => {
    // Generate distances with some variation based on a simple pattern
    const baseDistance = 2.0 + Math.random() * 1.0; // 2.0m to 3.0m base
    return Math.max(0.1, baseDistance + (Math.random() - 0.5) * 0.2); // Add noise
  });

  return {
    timestamp: new Date().toISOString(),
    distances: distances,
    resolution: "360deg",
    accuracy: "0.02m",
    fov: { horizontal: 360, vertical: 22.5 },
    range: { min: 0.15, max: 30 },
    units: "meters"
  };
};

// Get IMU data
export const getImuData = async () => {
  // For now, return mock IMU data until we have a real backend
  return {
    timestamp: new Date().toISOString(),
    orientation: {
      x: 0.1 + (Math.random() - 0.5) * 0.05, // Small variations around base value
      y: 0.2 + (Math.random() - 0.5) * 0.05,
      z: 0.3 + (Math.random() - 0.5) * 0.05,
      w: 0.9 + (Math.random() - 0.5) * 0.01
    },
    acceleration: {
      x: 0.02 + (Math.random() - 0.5) * 0.01, // Small variations around near-zero
      y: 0.01 + (Math.random() - 0.5) * 0.01,
      z: 9.81 + (Math.random() - 0.5) * 0.05 // Gravity with small variations
    },
    gyroscope: {
      x: (Math.random() - 0.5) * 0.02, // Small random rotations
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    },
    linearAcceleration: {
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
      z: (Math.random() - 0.5) * 0.1
    },
    magneticField: {
      x: 23.1 + (Math.random() - 0.5) * 0.5,
      y: 1.2 + (Math.random() - 0.5) * 0.2,
      z: 45.8 + (Math.random() - 0.5) * 0.5
    }
  };
};

// Get depth camera data
export const getDepthCameraData = async () => {
  // For now, return mock depth camera data until we have a real backend
  // Generate a simple depth map with some pattern
  const width = 64;
  const height = 64;
  const depthMap = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Create a pattern with objects at different depths
      // Center area has closer objects, edges have farther ones
      const centerX = width / 2;
      const centerY = height / 2;
      const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

      // Base distance with some variations
      let baseDistance = 2.0;
      if (distFromCenter < 10) {
        baseDistance = 1.0; // Close object in center
      } else if (distFromCenter < 20) {
        baseDistance = 1.5;
      } else {
        baseDistance = 2.5;
      }

      // Add some noise to the distance
      const noise = (Math.random() - 0.5) * 0.1;
      row.push(Math.max(0.1, baseDistance + noise));
    }
    depthMap.push(row);
  }

  return {
    timestamp: new Date().toISOString(),
    depthMap: depthMap,
    resolution: { width, height },
    fov: { horizontal: 60, vertical: 49 },
    range: { min: 0.3, max: 10 },
    units: "meters",
    format: "array2d"
  };
};

// Get all sensor data at once
export const getAllSensorData = async () => {
  const [lidar, imu, camera] = await Promise.all([
    getLidarData(),
    getImuData(),
    getDepthCameraData()
  ]);

  return {
    lidar,
    imu,
    camera,
    timestamp: new Date().toISOString()
  };
};

// Configure sensor parameters
export const configureSensor = async (sensorType, parameters) => {
  console.log(`Configuring ${sensorType} with parameters:`, parameters);

  // Validate sensor type
  const validSensors = ['lidar', 'imu', 'camera', 'gps', 'compass'];
  if (!validSensors.includes(sensorType)) {
    throw new Error(`Invalid sensor type: ${sensorType}`);
  }

  // In a real implementation, this would send the configuration to the sensor
  // For now, we just return the parameters we received
  return {
    sensorType,
    parameters,
    timestamp: new Date().toISOString(),
    status: 'configured'
  };
};

// Get sensor configuration options
export const getSensorConfigurationOptions = async (sensorType) => {
  const configs = {
    lidar: {
      resolution: { options: ['16-beam', '32-beam', '64-beam', '128-beam'], default: '32-beam' },
      range: { min: 0.15, max: 100, unit: 'm', default: 30 },
      updateRate: { options: [5, 10, 20, 30], unit: 'Hz', default: 10 },
      noiseModel: { options: ['gaussian', 'uniform', 'none'], default: 'gaussian' }
    },
    imu: {
      accelerometerRange: { options: ['2g', '4g', '8g', '16g'], default: '4g' },
      gyroscopeRange: { options: ['250dps', '500dps', '1000dps', '2000dps'], default: '500dps' },
      updateRate: { options: [50, 100, 200, 400], unit: 'Hz', default: 100 }
    },
    camera: {
      resolution: { options: ['640x480', '1280x720', '1920x1080'], default: '640x480' },
      fov: { min: 30, max: 120, unit: 'degrees', default: 60 },
      updateRate: { options: [15, 30, 60], unit: 'fps', default: 30 }
    }
  };

  return configs[sensorType] || {};
};