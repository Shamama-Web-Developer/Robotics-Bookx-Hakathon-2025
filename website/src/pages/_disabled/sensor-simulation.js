import React from 'react';
import Layout from '@theme/Layout';
import SensorSimulation from '../src/components/Simulation/SensorSimulation';
import LIDARVisualization from '../src/components/Simulation/LIDARVisualization';
import IMUVisualization from '../src/components/Simulation/IMUVisualization';
import CameraVisualization from '../src/components/Simulation/CameraVisualization';
import LearningProgress from '../src/components/LearningProgress';
import { SimulationProvider } from '../src/context/SimulationContext';
import { ProgressProvider } from '../src/context/ProgressContext';

function SensorSimulationPage() {
  return (
    <SimulationProvider>
      <ProgressProvider>
        <Layout title="Sensor Simulation" description="Sensor simulation for digital twin robotics with realistic noise models">
          <div className="container margin-vert--lg">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h1>Sensor Simulation for Physical AI</h1>
                <p>
                  Explore how different sensors provide data about the robot's environment and state.
                  Each sensor type has unique characteristics and limitations that affect robot perception.
                </p>
                
                <SensorSimulation />
                
                <div className="sensor-data-display" style={{ marginTop: '2rem' }}>
                  <LIDARVisualization />
                  <IMUVisualization />
                  <CameraVisualization />
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <LearningProgress />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </ProgressProvider>
    </SimulationProvider>
  );
}

export default SensorSimulationPage;