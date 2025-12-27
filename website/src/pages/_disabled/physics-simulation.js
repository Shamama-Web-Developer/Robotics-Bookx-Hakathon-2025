import React from 'react';
import Layout from '@theme/Layout';
import PhysicsSimulation from '../src/components/Simulation/PhysicsSimulation';
import PhysicsParameters from '../src/components/Simulation/PhysicsParameters';
import LearningProgress from '../src/components/LearningProgress';
import { SimulationProvider } from '../src/context/SimulationContext';
import { ProgressProvider } from '../src/context/ProgressContext';

function PhysicsSimulationPage() {
  return (
    <SimulationProvider>
      <ProgressProvider>
        <Layout title="Physics Simulation" description="Interactive physics simulation for digital twin robotics">
          <div className="container margin-vert--lg">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h1>Physics-Based Robot Simulation</h1>
                <p>
                  This interactive simulation demonstrates how robots behave under the influence of physical forces like gravity and collisions.
                  Adjust the parameters to see how they affect the robot's behavior in real-time.
                </p>
                
                <PhysicsParameters />
                <PhysicsSimulation />
                
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

export default PhysicsSimulationPage;