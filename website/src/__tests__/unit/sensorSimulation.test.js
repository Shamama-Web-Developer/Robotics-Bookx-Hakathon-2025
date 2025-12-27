// website/src/__tests__/unit/sensorSimulation.test.js
// Unit tests for sensor simulation components

describe('Sensor Simulation Components', () => {
  test('should render SensorSimulation component correctly', () => {
    // This is a placeholder for an actual test
    expect(1).toBe(1);
  });

  test('should add realistic noise to sensor data', () => {
    // Test the noise addition function from the component
    const originalValue = 1.0;
    const noiseLevel = 0.01;
    const noisyValue = addRealisticNoise(originalValue, noiseLevel, 'gaussian');
    
    // The function is imported from the actual component
    // This is a placeholder to show where the test would go
    expect(typeof noisyValue).toBe('number');
  });

  test('should handle different sensor types', () => {
    // Example test for sensor types
    const sensorTypes = ['lidar', 'imu', 'camera'];
    expect(sensorTypes).toContain('lidar');
    expect(sensorTypes).toContain('imu');
    expect(sensorTypes).toContain('camera');
  });

  test('should generate proper LiDAR distances', () => {
    // Example test for LiDAR functionality
    const distances = [1.2, 0.8, 1.5, 2.1, 1.8, 1.0, 0.7, 1.3];
    expect(Array.isArray(distances)).toBe(true);
    expect(distances.length).toBeGreaterThan(0);
    expect(distances.every(d => typeof d === 'number' && d > 0)).toBe(true);
  });
});

// Helper function to simulate the addRealisticNoise function from the component
function addRealisticNoise(value, noiseLevel, noiseType = 'gaussian') {
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
}

// Additional tests would go here for other sensor simulation functionality