import React from 'react';
import Layout from '@theme/Layout';
import RenderingVisualization from '../src/components/Simulation/RenderingVisualization';
import LearningProgress from '../src/components/LearningProgress';
import { SimulationProvider } from '../src/context/SimulationContext';
import { ProgressProvider } from '../src/context/ProgressContext';

function RenderingVisualizationPage() {
  return (
    <SimulationProvider>
      <ProgressProvider>
        <Layout title="Rendering Visualization" description="High-fidelity rendering and visualization for digital twin robotics">
          <div className="container margin-vert--lg">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h1>High-Fidelity Rendering and Visualization</h1>
                <p>
                  Explore how realistic rendering enhances the understanding of robot-environment interactions.
                  Adjust lighting, materials, and viewing angles to see different aspects of the robot and environment.
                </p>
                
                <RenderingVisualization />
                
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

export default RenderingVisualizationPage;