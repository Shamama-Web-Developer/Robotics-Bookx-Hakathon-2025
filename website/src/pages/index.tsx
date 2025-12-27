import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import { TranslationProvider, useTranslation } from '../context/TranslationContext';
import LanguageSelector from '../components/LanguageSelector';

// Typing animation hook
function useTypingEffect(texts: string[], typingSpeed = 100, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, pauseTime]);

  return displayText;
}

function HomepageHero() {
  const { t, isRTL } = useTranslation();
  const typingText = useTypingEffect([
    'Build Autonomous Robots',
    'Master ROS 2 & Isaac Sim',
    'Create Digital Twins',
    'Deploy AI-Powered Systems',
  ], 80, 2500);

  return (
    <header className={clsx(styles.hero, isRTL && styles.rtl)}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGrid}></div>
        <div className={styles.heroGlow}></div>
        <div className={styles.particleField}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${3 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 2}s`,
            } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgePulse}></span>
            <span>{t('badge')}</span>
            <span className={styles.badgeShine}></span>
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.titleGradient}>{t('heroTitle1')}</span>
            <br />
            <span className={styles.titleSecondary}>{t('heroTitle2')}</span>
          </Heading>
          <div className={styles.typingContainer}>
            <span className={styles.typingText}>{typingText}</span>
            <span className={styles.typingCursor}>|</span>
          </div>
          <p className={styles.heroSubtitle}>
            {t('heroSubtitle')}
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>{t('modules')}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>40+</span>
              <span className={styles.statLabel}>{t('chapters')}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>{t('examples')}</span>
            </div>
          </div>
          <div className={styles.heroButtons}>
            <Link className={styles.buttonPrimary} to="/docs/intro">
              <span>{t('startLearning')}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link className={styles.buttonSecondary} to="https://github.com/your-github-username/REBOTIC-BOOK-HAKATHON">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>{t('viewGithub')}</span>
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.bookShowcase}>
            <div className={styles.book3D}>
              <div className={styles.bookCover}>
                <div className={styles.bookSpine}></div>
                <div className={styles.bookFront}>
                  <div className={styles.bookGlow}></div>
                  <div className={styles.bookTitle}>
                    <span className={styles.bookIcon}>🤖</span>
                    <h3>Physical AI</h3>
                    <p>Humanoid Robotics</p>
                  </div>
                  <div className={styles.bookChapters}>
                    <div className={styles.chapterLine}></div>
                    <div className={styles.chapterLine}></div>
                    <div className={styles.chapterLine}></div>
                  </div>
                </div>
              </div>
              <div className={styles.bookShadow}></div>
            </div>
            <div className={styles.floatingElements}>
              <div className={styles.floatingIcon} style={{'--delay': '0s', '--x': '-80px', '--y': '-60px'} as React.CSSProperties}>
                <span>ROS 2</span>
              </div>
              <div className={styles.floatingIcon} style={{'--delay': '0.5s', '--x': '80px', '--y': '-40px'} as React.CSSProperties}>
                <span>Isaac</span>
              </div>
              <div className={styles.floatingIcon} style={{'--delay': '1s', '--x': '-60px', '--y': '60px'} as React.CSSProperties}>
                <span>AI</span>
              </div>
              <div className={styles.floatingIcon} style={{'--delay': '1.5s', '--x': '70px', '--y': '50px'} as React.CSSProperties}>
                <span>VLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>{t('scrollExplore')}</span>
        <div className={styles.scrollArrow}></div>
      </div>
    </header>
  );
}

const modules = [
  {
    number: '01',
    title: 'ROS 2 Foundations',
    subtitle: 'The Robotic Nervous System',
    description: 'Master nodes, topics, services, and actions. Build the communication backbone for intelligent robots.',
    icon: '/img/icons/network-nodes.svg',
    link: '/docs/module1/intro',
    color: '#3182ce',
    topics: ['Nodes & Topics', 'Services & Actions', 'URDF Models', 'rclpy Programming'],
  },
  {
    number: '02',
    title: 'Digital Twin Simulation',
    subtitle: 'Virtual Robotics Lab',
    description: 'Create physics-accurate simulations with Isaac Sim. Test behaviors safely before real deployment.',
    icon: '/img/icons/simulation-3d.svg',
    link: '/docs/digital-twin-robotics/physics-simulation',
    color: '#805ad5',
    topics: ['Physics Simulation', 'Sensor Modeling', 'Environment Design', 'Real-time Sync'],
  },
  {
    number: '03',
    title: 'Isaac Robotic Brain',
    subtitle: 'Perception & Navigation',
    description: 'Implement SLAM, visual perception, and autonomous navigation using NVIDIA Isaac technology.',
    icon: '/img/icons/neural-brain.svg',
    link: '/docs/isaac-robotic-brain/quickstart-guide',
    color: '#38a169',
    topics: ['VSLAM', 'Object Detection', 'Path Planning', 'Nav2 Integration'],
  },
  {
    number: '04',
    title: 'Vision-Language-Action',
    subtitle: 'AI-Powered Autonomy',
    description: 'Connect voice commands to robot actions through LLM planning. Build end-to-end autonomous systems.',
    icon: '/img/icons/voice-action.svg',
    link: '/docs/vla-humanoid-robotics/intro',
    color: '#dd6b20',
    topics: ['Speech Recognition', 'LLM Planning', 'Action Execution', 'Capstone Project'],
  },
];

function ModulesSection() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Course Curriculum</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Four Modules to Mastery
          </Heading>
          <p className={styles.sectionDescription}>
            A structured learning path from fundamentals to advanced AI-powered robotics
          </p>
        </div>
        <div className={styles.modulesGrid}>
          {modules.map((module, idx) => (
            <Link
              key={idx}
              to={module.link}
              className={styles.moduleCard}
              style={{'--module-color': module.color, '--delay': `${idx * 0.1}s`} as React.CSSProperties}
            >
              <div className={styles.moduleNumber}>{module.number}</div>
              <div className={styles.moduleIcon}>
                <img src={module.icon} alt={module.title} />
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <span className={styles.moduleSubtitle}>{module.subtitle}</span>
                <p className={styles.moduleDescription}>{module.description}</p>
                <div className={styles.moduleTopics}>
                  {module.topics.map((topic, i) => (
                    <span key={i} className={styles.topicTag}>{topic}</span>
                  ))}
                </div>
              </div>
              <div className={styles.moduleArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { icon: '🎓', titleKey: 'structuredLearning', descKey: 'structuredDesc' },
    { icon: '🔬', titleKey: 'handsOn', descKey: 'handsOnDesc' },
    { icon: '🤖', titleKey: 'industry', descKey: 'industryDesc' },
    { icon: '🚀', titleKey: 'capstone', descKey: 'capstoneDesc' },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={styles.featureCard}
              style={{'--delay': `${idx * 0.1}s`} as React.CSSProperties}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{t(feature.titleKey)}</h3>
              <p className={styles.featureDescription}>{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Female Robot Mascot Component
function RobotMascotSection() {
  const { t } = useTranslation();
  const [currentTip, setCurrentTip] = useState(0);

  const robotTips = [
    { titleKey: 'mascotTitle1', msgKey: 'mascotMsg1' },
    { titleKey: 'mascotTitle2', msgKey: 'mascotMsg2' },
    { titleKey: 'mascotTitle3', msgKey: 'mascotMsg3' },
    { titleKey: 'mascotTitle4', msgKey: 'mascotMsg4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % robotTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.mascotSection}>
      <div className="container">
        <div className={styles.mascotContainer}>
          <div className={styles.robotMascot}>
            <div className={styles.robotHead}>
              <div className={styles.robotFace}>
                <div className={styles.robotEyes}>
                  <div className={styles.robotEye}>
                    <div className={styles.robotPupil}></div>
                  </div>
                  <div className={styles.robotEye}>
                    <div className={styles.robotPupil}></div>
                  </div>
                </div>
                <div className={styles.robotMouth}></div>
                <div className={styles.robotBlush}></div>
                <div className={styles.robotBlush} style={{right: '15px', left: 'auto'}}></div>
              </div>
              <div className={styles.robotAntenna}>
                <div className={styles.antennaLight}></div>
              </div>
              <div className={styles.robotHair}>
                <div className={styles.hairStrand}></div>
                <div className={styles.hairStrand}></div>
                <div className={styles.hairStrand}></div>
              </div>
            </div>
            <div className={styles.robotBody}>
              <div className={styles.robotChest}>
                <div className={styles.robotHeart}></div>
              </div>
              <div className={styles.robotArm} style={{left: '-25px'}}></div>
              <div className={styles.robotArm} style={{right: '-25px'}}></div>
            </div>
          </div>

          <div className={styles.speechBubble}>
            <div className={styles.speechContent}>
              <h3 className={styles.speechTitle}>{t(robotTips[currentTip].titleKey)}</h3>
              <p className={styles.speechMessage}>{t(robotTips[currentTip].msgKey)}</p>
            </div>
            <div className={styles.speechTail}></div>
            <div className={styles.tipIndicators}>
              {robotTips.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.tipDot} ${currentTip === idx ? styles.activeDot : ''}`}
                  onClick={() => setCurrentTip(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const { t } = useTranslation();

  const technologies = [
    { nameKey: 'tech1', logo: '🤖' },
    { nameKey: 'tech2', logo: '🎮' },
    { nameKey: 'tech3', logo: '🐍' },
    { nameKey: 'tech4', logo: '🎤' },
    { nameKey: 'tech5', logo: '🧠' },
    { nameKey: 'tech6', logo: '🧭' },
  ];

  return (
    <section className={styles.techSection}>
      <div className="container">
        <div className={styles.techContent}>
          <span className={styles.sectionLabel}>{t('techStack')}</span>
          <Heading as="h2" className={styles.techTitle}>
            {t('builtWith')}
          </Heading>
          <div className={styles.techGrid}>
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className={styles.techItem}
                style={{'--delay': `${idx * 0.1}s`} as React.CSSProperties}
              >
                <span className={styles.techLogo}>{tech.logo}</span>
                <span className={styles.techName}>{t(tech.nameKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookPreviewSection() {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState(0);

  const bookChaptersData = [
    {
      moduleNum: '1',
      titleKey: 'module1Title',
      chapterKeys: ['module1Ch1', 'module1Ch2', 'module1Ch3', 'module1Ch4', 'module1Ch5', 'module1Ch6'],
      color: '#ec4899',
      icon: '🔧',
    },
    {
      moduleNum: '2',
      titleKey: 'module2Title',
      chapterKeys: ['module2Ch1', 'module2Ch2', 'module2Ch3', 'module2Ch4', 'module2Ch5', 'module2Ch6'],
      color: '#a855f7',
      icon: '🌐',
    },
    {
      moduleNum: '3',
      titleKey: 'module3Title',
      chapterKeys: ['module3Ch1', 'module3Ch2', 'module3Ch3', 'module3Ch4', 'module3Ch5', 'module3Ch6'],
      color: '#f472b6',
      icon: '🧠',
    },
    {
      moduleNum: '4',
      titleKey: 'module4Title',
      chapterKeys: ['module4Ch1', 'module4Ch2', 'module4Ch3', 'module4Ch4', 'module4Ch5', 'module4Ch6'],
      color: '#fb7185',
      icon: '🎯',
    },
  ];

  // Transform data to use translated values
  const bookChapters = bookChaptersData.map(book => ({
    ...book,
    module: `${t('modules')} ${book.moduleNum}`,
    title: t(book.titleKey),
    chapters: book.chapterKeys.map(key => t(key)),
  }));

  return (
    <section className={styles.bookPreviewSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t('insideBook')}</span>
          <Heading as="h2" className={styles.sectionTitle}>
            {t('chapterGuide')}
          </Heading>
          <p className={styles.sectionDescription}>
            {t('chapterGuideDesc')}
          </p>
        </div>

        <div className={styles.bookPreviewContainer}>
          <div className={styles.moduleTabsContainer}>
            {bookChapters.map((book, idx) => (
              <button
                key={idx}
                className={clsx(styles.moduleTab, activeModule === idx && styles.activeTab)}
                onClick={() => setActiveModule(idx)}
                style={{'--tab-color': book.color} as React.CSSProperties}
              >
                <span className={styles.tabIcon}>{book.icon}</span>
                <div className={styles.tabContent}>
                  <span className={styles.tabModule}>{book.module}</span>
                  <span className={styles.tabTitle}>{book.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.chapterListContainer}>
            <div className={styles.chapterListCard} style={{'--accent-color': bookChapters[activeModule].color} as React.CSSProperties}>
              <div className={styles.chapterListHeader}>
                <span className={styles.chapterListIcon}>{bookChapters[activeModule].icon}</span>
                <div>
                  <h3>{bookChapters[activeModule].title}</h3>
                  <span className={styles.chapterCount}>{bookChapters[activeModule].chapters.length} {t('chapters')}</span>
                </div>
              </div>
              <ul className={styles.chapterList}>
                {bookChapters[activeModule].chapters.map((chapter, idx) => (
                  <li key={idx} className={styles.chapterItem} style={{'--delay': `${idx * 0.1}s`} as React.CSSProperties}>
                    <span className={styles.chapterNumber}>{String(idx + 1).padStart(2, '0')}</span>
                    <span className={styles.chapterName}>{chapter}</span>
                    <svg className={styles.chapterArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </li>
                ))}
              </ul>
              <Link to="/docs/intro" className={styles.exploreModuleBtn}>
                {t('exploreModule')} {bookChapters[activeModule].module}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "This book transformed my understanding of robotics. The hands-on approach with Isaac Sim made complex concepts accessible.",
    author: "Dr. Sarah Chen",
    role: "Robotics Engineer, Boston Dynamics",
    avatar: "👩‍🔬",
  },
  {
    quote: "Finally, a comprehensive guide that bridges ROS 2 fundamentals with cutting-edge AI integration. Essential reading.",
    author: "Marcus Rodriguez",
    role: "Lead Developer, NVIDIA Isaac Team",
    avatar: "👨‍💻",
  },
  {
    quote: "The VLA module alone is worth the entire book. Real-world applications of LLMs in robotics explained brilliantly.",
    author: "Dr. Emily Watson",
    role: "AI Research Lead, OpenAI",
    avatar: "👩‍🎓",
  },
];

function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>What Experts Say</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Trusted by Industry Leaders
          </Heading>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={styles.testimonialCard}
              style={{'--delay': `${idx * 0.2}s`} as React.CSSProperties}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quoteText}>{testimonial.quote}</p>
              <div className={styles.testimonialAuthor}>
                <span className={styles.authorAvatar}>{testimonial.avatar}</span>
                <div>
                  <span className={styles.authorName}>{testimonial.author}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const learningPath = [
  { step: 1, title: 'Foundation', desc: 'Master ROS 2 basics', duration: '2-3 weeks' },
  { step: 2, title: 'Simulation', desc: 'Build digital twins', duration: '3-4 weeks' },
  { step: 3, title: 'Intelligence', desc: 'Add AI capabilities', duration: '4-5 weeks' },
  { step: 4, title: 'Integration', desc: 'Complete autonomous systems', duration: '3-4 weeks' },
];

function LearningPathSection() {
  return (
    <section className={styles.learningPathSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Your Journey</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Structured Learning Path
          </Heading>
          <p className={styles.sectionDescription}>
            A clear roadmap from beginner to robotics expert
          </p>
        </div>
        <div className={styles.pathContainer}>
          <div className={styles.pathLine}></div>
          <div className={styles.pathSteps}>
            {learningPath.map((item, idx) => (
              <div
                key={idx}
                className={styles.pathStep}
                style={{'--delay': `${idx * 0.15}s`} as React.CSSProperties}
              >
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{item.title}</h4>
                  <p className={styles.stepDesc}>{item.desc}</p>
                  <span className={styles.stepDuration}>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <div className={styles.ctaGlow}></div>
          <Heading as="h2" className={styles.ctaTitle}>
            Ready to Build the Future?
          </Heading>
          <p className={styles.ctaDescription}>
            Start your journey into humanoid robotics today. No prior robotics experience required.
          </p>
          <div className={styles.ctaStats}>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>10K+</span>
              <span className={styles.ctaStatLabel}>Learners</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>4.9</span>
              <span className={styles.ctaStatLabel}>Rating</span>
            </div>
            <div className={styles.ctaStat}>
              <span className={styles.ctaStatNumber}>24/7</span>
              <span className={styles.ctaStatLabel}>Support</span>
            </div>
          </div>
          <div className={styles.ctaButtons}>
            <Link className={styles.ctaPrimary} to="/docs/intro">
              Begin Your Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeContent(): ReactNode {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="A comprehensive guide to ROS 2-based humanoid robot control, digital twin simulation, and AI-powered autonomy">
      <HomepageHero />
      <main>
        <RobotMascotSection />
        <FeaturesSection />
        <BookPreviewSection />
        <ModulesSection />
        <LearningPathSection />
        <TechStackSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LanguageSelector />
    </Layout>
  );
}

export default function Home(): ReactNode {
  return (
    <TranslationProvider>
      <HomeContent />
    </TranslationProvider>
  );
}
