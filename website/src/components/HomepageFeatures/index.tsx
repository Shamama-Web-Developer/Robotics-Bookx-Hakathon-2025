import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS 2 Foundations',
    icon: '/img/icons/network-nodes.svg',
    description: (
      <>
        Master the robotic nervous system with nodes, topics, services, and
        actions. Learn to build communication architectures for humanoid robots.
      </>
    ),
    link: '/docs/module1/intro',
  },
  {
    title: 'Digital Twin Simulation',
    icon: '/img/icons/simulation-3d.svg',
    description: (
      <>
        Build realistic physics simulations with Isaac Sim and Omniverse.
        Create virtual environments to test robot behaviors safely.
      </>
    ),
    link: '/docs/digital-twin-robotics/physics-simulation',
  },
  {
    title: 'Isaac Robotic Brain',
    icon: '/img/icons/neural-brain.svg',
    description: (
      <>
        Implement perception, navigation, and SLAM for autonomous robots.
        Integrate NVIDIA Isaac for intelligent decision-making.
      </>
    ),
    link: '/docs/isaac-robotic-brain/quickstart-guide',
  },
  {
    title: 'Vision-Language-Action',
    icon: '/img/icons/voice-action.svg',
    description: (
      <>
        Connect voice commands to robot actions through LLM-powered planning.
        Build end-to-end autonomous humanoid systems.
      </>
    ),
    link: '/docs/vla-humanoid-robotics/intro',
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCol)}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <img src={icon} alt={title} role="img" aria-label={title} />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureArrow}>
          <span>Learn more →</span>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Course Modules</Heading>
          <p>Four comprehensive modules covering the complete robotics stack</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
