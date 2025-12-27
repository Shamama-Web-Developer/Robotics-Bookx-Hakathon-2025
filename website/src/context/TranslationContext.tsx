import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language definitions with country info - Comprehensive world languages list
export const languages = [
  // Featured/Special Languages
  { code: 'en', name: 'English', country: 'United States', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ur', name: 'اردو', country: 'Pakistan', flag: '🇵🇰', dir: 'rtl', special: true },
  { code: 'ur-easy', name: 'آسان اردو', country: 'Pakistan (Easy)', flag: '🇵🇰', dir: 'rtl', special: true, easyMode: true },

  // Middle East & North Africa
  { code: 'ar', name: 'العربية', country: 'Saudi Arabia', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ar-eg', name: 'العربية المصرية', country: 'Egypt', flag: '🇪🇬', dir: 'rtl' },
  { code: 'ar-ae', name: 'العربية الإماراتية', country: 'UAE', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fa', name: 'فارسی', country: 'Iran', flag: '🇮🇷', dir: 'rtl' },
  { code: 'he', name: 'עברית', country: 'Israel', flag: '🇮🇱', dir: 'rtl' },

  // South Asia
  { code: 'hi', name: 'हिन्दी', country: 'India', flag: '🇮🇳', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', country: 'Bangladesh', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ta', name: 'தமிழ்', country: 'Tamil Nadu', flag: '🇮🇳', dir: 'ltr' },
  { code: 'te', name: 'తెలుగు', country: 'Andhra Pradesh', flag: '🇮🇳', dir: 'ltr' },
  { code: 'mr', name: 'मराठी', country: 'Maharashtra', flag: '🇮🇳', dir: 'ltr' },
  { code: 'gu', name: 'ગુજરાતી', country: 'Gujarat', flag: '🇮🇳', dir: 'ltr' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', country: 'Punjab', flag: '🇮🇳', dir: 'ltr' },
  { code: 'si', name: 'සිංහල', country: 'Sri Lanka', flag: '🇱🇰', dir: 'ltr' },
  { code: 'ne', name: 'नेपाली', country: 'Nepal', flag: '🇳🇵', dir: 'ltr' },

  // East Asia
  { code: 'zh', name: '中文简体', country: 'China', flag: '🇨🇳', dir: 'ltr' },
  { code: 'zh-tw', name: '中文繁體', country: 'Taiwan', flag: '🇹🇼', dir: 'ltr' },
  { code: 'ja', name: '日本語', country: 'Japan', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: '한국어', country: 'South Korea', flag: '🇰🇷', dir: 'ltr' },
  { code: 'mn', name: 'Монгол', country: 'Mongolia', flag: '🇲🇳', dir: 'ltr' },

  // Southeast Asia
  { code: 'id', name: 'Bahasa Indonesia', country: 'Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'ms', name: 'Bahasa Melayu', country: 'Malaysia', flag: '🇲🇾', dir: 'ltr' },
  { code: 'th', name: 'ภาษาไทย', country: 'Thailand', flag: '🇹🇭', dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', country: 'Vietnam', flag: '🇻🇳', dir: 'ltr' },
  { code: 'tl', name: 'Filipino', country: 'Philippines', flag: '🇵🇭', dir: 'ltr' },
  { code: 'my', name: 'မြန်မာဘာသာ', country: 'Myanmar', flag: '🇲🇲', dir: 'ltr' },
  { code: 'km', name: 'ភាសាខ្មែរ', country: 'Cambodia', flag: '🇰🇭', dir: 'ltr' },

  // Europe - Western
  { code: 'es', name: 'Español', country: 'Spain', flag: '🇪🇸', dir: 'ltr' },
  { code: 'es-mx', name: 'Español Mexicano', country: 'Mexico', flag: '🇲🇽', dir: 'ltr' },
  { code: 'fr', name: 'Français', country: 'France', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', country: 'Germany', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italiano', country: 'Italy', flag: '🇮🇹', dir: 'ltr' },
  { code: 'pt', name: 'Português', country: 'Brazil', flag: '🇧🇷', dir: 'ltr' },
  { code: 'pt-pt', name: 'Português', country: 'Portugal', flag: '🇵🇹', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', country: 'Netherlands', flag: '🇳🇱', dir: 'ltr' },

  // Europe - Northern
  { code: 'sv', name: 'Svenska', country: 'Sweden', flag: '🇸🇪', dir: 'ltr' },
  { code: 'no', name: 'Norsk', country: 'Norway', flag: '🇳🇴', dir: 'ltr' },
  { code: 'da', name: 'Dansk', country: 'Denmark', flag: '🇩🇰', dir: 'ltr' },
  { code: 'fi', name: 'Suomi', country: 'Finland', flag: '🇫🇮', dir: 'ltr' },

  // Europe - Eastern
  { code: 'ru', name: 'Русский', country: 'Russia', flag: '🇷🇺', dir: 'ltr' },
  { code: 'uk', name: 'Українська', country: 'Ukraine', flag: '🇺🇦', dir: 'ltr' },
  { code: 'pl', name: 'Polski', country: 'Poland', flag: '🇵🇱', dir: 'ltr' },
  { code: 'cs', name: 'Čeština', country: 'Czech Republic', flag: '🇨🇿', dir: 'ltr' },
  { code: 'sk', name: 'Slovenčina', country: 'Slovakia', flag: '🇸🇰', dir: 'ltr' },
  { code: 'hu', name: 'Magyar', country: 'Hungary', flag: '🇭🇺', dir: 'ltr' },
  { code: 'ro', name: 'Română', country: 'Romania', flag: '🇷🇴', dir: 'ltr' },
  { code: 'bg', name: 'Български', country: 'Bulgaria', flag: '🇧🇬', dir: 'ltr' },
  { code: 'hr', name: 'Hrvatski', country: 'Croatia', flag: '🇭🇷', dir: 'ltr' },
  { code: 'sr', name: 'Српски', country: 'Serbia', flag: '🇷🇸', dir: 'ltr' },

  // Europe - Southern
  { code: 'el', name: 'Ελληνικά', country: 'Greece', flag: '🇬🇷', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', country: 'Turkey', flag: '🇹🇷', dir: 'ltr' },

  // Africa
  { code: 'sw', name: 'Kiswahili', country: 'Kenya/Tanzania', flag: '🇰🇪', dir: 'ltr' },
  { code: 'am', name: 'አማርኛ', country: 'Ethiopia', flag: '🇪🇹', dir: 'ltr' },
  { code: 'ha', name: 'Hausa', country: 'Nigeria', flag: '🇳🇬', dir: 'ltr' },
  { code: 'yo', name: 'Yorùbá', country: 'Nigeria', flag: '🇳🇬', dir: 'ltr' },
  { code: 'zu', name: 'isiZulu', country: 'South Africa', flag: '🇿🇦', dir: 'ltr' },
  { code: 'af', name: 'Afrikaans', country: 'South Africa', flag: '🇿🇦', dir: 'ltr' },

  // Central Asia
  { code: 'kk', name: 'Қазақша', country: 'Kazakhstan', flag: '🇰🇿', dir: 'ltr' },
  { code: 'uz', name: "O'zbekcha", country: 'Uzbekistan', flag: '🇺🇿', dir: 'ltr' },
  { code: 'az', name: 'Azərbaycanca', country: 'Azerbaijan', flag: '🇦🇿', dir: 'ltr' },
];

// Translations for homepage content
export const translations: Record<string, Record<string, string>> = {
  en: {
    // Hero Section
    badge: 'New 2025 Edition',
    heroTitle1: 'Physical AI',
    heroTitle2: '& Humanoid Robotics',
    heroSubtitle: 'Master the complete robotics stack — from ROS 2 foundations to AI-powered autonomous systems. Build, simulate, and deploy intelligent humanoid robots.',
    startLearning: 'Start Learning',
    viewGithub: 'View on GitHub',
    modules: 'Modules',
    chapters: 'Chapters',
    examples: 'Examples',
    scrollExplore: 'Scroll to explore',

    // Robot Mascot
    mascotTitle1: 'Welcome to Your Journey!',
    mascotMsg1: "Hi there! I'm Rosa, your AI learning companion. This book will guide you through the exciting world of humanoid robotics - from building your first ROS 2 node to creating fully autonomous AI systems!",
    mascotTitle2: 'Start with the Basics',
    mascotMsg2: 'Begin with Module 1 to master ROS 2 foundations. Understanding nodes, topics, and services is essential for everything that comes next. Take your time - I\'ll be here to help!',
    mascotTitle3: 'Hands-On Learning',
    mascotMsg3: 'Each chapter includes practical exercises and code examples. Don\'t just read - try building along! The best way to learn robotics is by doing.',
    mascotTitle4: 'Created with Love',
    mascotMsg4: 'This book was crafted by our amazing female engineering team who believe everyone can master robotics. We\'re here to make complex concepts accessible and fun!',

    // Features
    structuredLearning: 'Structured Learning',
    structuredDesc: 'Progressive curriculum from basics to advanced topics with clear prerequisites',
    handsOn: 'Hands-On Exercises',
    handsOnDesc: 'Practical exercises and projects to reinforce concepts with real code',
    industry: 'Industry Standards',
    industryDesc: 'Learn ROS 2, NVIDIA Isaac, and production-ready robotics patterns',
    capstone: 'Capstone Project',
    capstoneDesc: 'Build a complete autonomous humanoid system as your final project',

    // Sections
    insideBook: 'Inside the Book',
    chapterGuide: 'Comprehensive Chapter Guide',
    chapterGuideDesc: 'Explore 40+ chapters covering every aspect of humanoid robotics development',
    courseCurriculum: 'Course Curriculum',
    fourModules: 'Four Modules to Mastery',
    fourModulesDesc: 'A structured learning path from fundamentals to advanced AI-powered robotics',
    yourJourney: 'Your Journey',
    learningPath: 'Structured Learning Path',
    learningPathDesc: 'A clear roadmap from beginner to robotics expert',
    techStack: 'Technology Stack',
    builtWith: 'Built with Industry-Leading Tools',
    whatExperts: 'What Experts Say',
    trustedBy: 'Trusted by Industry Leaders',
    readyBuild: 'Ready to Build the Future?',
    ctaDesc: 'Start your journey into humanoid robotics today. No prior robotics experience required.',
    beginJourney: 'Begin Your Journey',
    learners: 'Learners',
    rating: 'Rating',
    support: 'Support',

    // Module 1
    module1Title: 'ROS 2 Foundations',
    module1Subtitle: 'The Robotic Nervous System',
    module1Desc: 'Master nodes, topics, services, and actions. Build the communication backbone for intelligent robots.',
    module1Topic1: 'Nodes & Topics',
    module1Topic2: 'Services & Actions',
    module1Topic3: 'URDF Models',
    module1Topic4: 'rclpy Programming',
    module1Ch1: 'Introduction to ROS 2 Architecture',
    module1Ch2: 'Nodes, Topics & Message Passing',
    module1Ch3: 'Services, Actions & Parameters',
    module1Ch4: 'URDF & Robot Description',
    module1Ch5: 'rclpy Programming Patterns',
    module1Ch6: 'Launch Files & Configuration',

    // Module 2
    module2Title: 'Digital Twin Simulation',
    module2Subtitle: 'Virtual Robotics Lab',
    module2Desc: 'Create physics-accurate simulations with Isaac Sim. Test behaviors safely before real deployment.',
    module2Topic1: 'Physics Simulation',
    module2Topic2: 'Sensor Modeling',
    module2Topic3: 'Environment Design',
    module2Topic4: 'Real-time Sync',
    module2Ch1: 'Isaac Sim Environment Setup',
    module2Ch2: 'Physics Engine Configuration',
    module2Ch3: 'Sensor Simulation & Modeling',
    module2Ch4: 'Real-time Synchronization',
    module2Ch5: 'Environment Design',
    module2Ch6: 'Testing & Validation',

    // Module 3
    module3Title: 'Isaac Robotic Brain',
    module3Subtitle: 'Perception & Navigation',
    module3Desc: 'Implement SLAM, visual perception, and autonomous navigation using NVIDIA Isaac technology.',
    module3Topic1: 'VSLAM',
    module3Topic2: 'Object Detection',
    module3Topic3: 'Path Planning',
    module3Topic4: 'Nav2 Integration',
    module3Ch1: 'Visual SLAM Implementation',
    module3Ch2: 'Object Detection & Recognition',
    module3Ch3: 'Path Planning Algorithms',
    module3Ch4: 'Nav2 Integration',
    module3Ch5: 'Perception Pipeline',
    module3Ch6: 'Autonomous Navigation',

    // Module 4
    module4Title: 'Vision-Language-Action',
    module4Subtitle: 'AI-Powered Autonomy',
    module4Desc: 'Connect voice commands to robot actions through LLM planning. Build end-to-end autonomous systems.',
    module4Topic1: 'Speech Recognition',
    module4Topic2: 'LLM Planning',
    module4Topic3: 'Action Execution',
    module4Topic4: 'Capstone Project',
    module4Ch1: 'Speech Recognition with Whisper',
    module4Ch2: 'LLM Integration & Planning',
    module4Ch3: 'Action Execution Pipeline',
    module4Ch4: 'Multi-modal Reasoning',
    module4Ch5: 'End-to-End Systems',
    module4Ch6: 'Capstone Project',

    // Learning Path
    step1Title: 'Foundation',
    step1Desc: 'Master ROS 2 basics',
    step1Duration: '2-3 weeks',
    step2Title: 'Simulation',
    step2Desc: 'Build digital twins',
    step2Duration: '3-4 weeks',
    step3Title: 'Intelligence',
    step3Desc: 'Add AI capabilities',
    step3Duration: '4-5 weeks',
    step4Title: 'Integration',
    step4Desc: 'Complete autonomous systems',
    step4Duration: '3-4 weeks',

    // Tech Stack
    tech1: 'ROS 2 Jazzy',
    tech2: 'NVIDIA Isaac',
    tech3: 'Python',
    tech4: 'OpenAI Whisper',
    tech5: 'LLMs',
    tech6: 'Nav2',

    // Testimonials
    testimonial1Quote: 'This book transformed my understanding of robotics. The hands-on approach with Isaac Sim made complex concepts accessible.',
    testimonial1Author: 'Dr. Sarah Chen',
    testimonial1Role: 'Robotics Engineer, Boston Dynamics',
    testimonial2Quote: 'Finally, a comprehensive guide that bridges ROS 2 fundamentals with cutting-edge AI integration. Essential reading.',
    testimonial2Author: 'Marcus Rodriguez',
    testimonial2Role: 'Lead Developer, NVIDIA Isaac Team',
    testimonial3Quote: 'The VLA module alone is worth the entire book. Real-world applications of LLMs in robotics explained brilliantly.',
    testimonial3Author: 'Dr. Emily Watson',
    testimonial3Role: 'AI Research Lead, OpenAI',

    // Explore button
    exploreModule: 'Explore',

    // Language selector
    selectLanguage: 'Select Language',
    specialUrdu: 'اردو میں پڑھیں',
  },
  ur: {
    // Hero Section
    badge: 'نیا 2025 ایڈیشن',
    heroTitle1: 'فزیکل اے آئی',
    heroTitle2: 'اور ہیومنائیڈ روبوٹکس',
    heroSubtitle: 'مکمل روبوٹکس اسٹیک میں مہارت حاصل کریں — ROS 2 کی بنیادوں سے لے کر AI سے چلنے والے خود مختار نظام تک۔ ذہین ہیومنائیڈ روبوٹس بنائیں، سمولیٹ کریں اور تعینات کریں۔',
    startLearning: 'سیکھنا شروع کریں',
    viewGithub: 'گٹ ہب پر دیکھیں',
    modules: 'ماڈیولز',
    chapters: 'ابواب',
    examples: 'مثالیں',
    scrollExplore: 'دریافت کرنے کے لیے سکرول کریں',

    // Robot Mascot
    mascotTitle1: 'آپ کے سفر میں خوش آمدید!',
    mascotMsg1: 'ہیلو! میں روزا ہوں، آپ کی AI سیکھنے کی ساتھی۔ یہ کتاب آپ کو ہیومنائیڈ روبوٹکس کی دلچسپ دنیا میں رہنمائی کرے گی - اپنا پہلا ROS 2 نوڈ بنانے سے لے کر مکمل خود مختار AI سسٹم بنانے تک!',
    mascotTitle2: 'بنیادی باتوں سے شروع کریں',
    mascotMsg2: 'ROS 2 کی بنیادوں میں مہارت حاصل کرنے کے لیے ماڈیول 1 سے شروع کریں۔ نوڈز، ٹاپکس اور سروسز کو سمجھنا آگے کی ہر چیز کے لیے ضروری ہے۔ اپنا وقت لیں - میں مدد کے لیے یہاں ہوں!',
    mascotTitle3: 'عملی سیکھنا',
    mascotMsg3: 'ہر باب میں عملی مشقیں اور کوڈ کی مثالیں شامل ہیں۔ صرف پڑھیں نہیں - ساتھ ساتھ بنانے کی کوشش کریں! روبوٹکس سیکھنے کا بہترین طریقہ کر کے سیکھنا ہے۔',
    mascotTitle4: 'محبت سے بنایا گیا',
    mascotMsg4: 'یہ کتاب ہماری شاندار خواتین انجینئرنگ ٹیم نے بنائی ہے جو یقین رکھتی ہیں کہ ہر کوئی روبوٹکس میں مہارت حاصل کر سکتا ہے۔ ہم پیچیدہ تصورات کو قابل رسائی اور مزے دار بنانے کے لیے یہاں ہیں!',

    // Features
    structuredLearning: 'منظم سیکھنا',
    structuredDesc: 'واضح شرائط کے ساتھ بنیادی سے اعلی موضوعات تک ترقی پذیر نصاب',
    handsOn: 'عملی مشقیں',
    handsOnDesc: 'حقیقی کوڈ کے ساتھ تصورات کو مضبوط کرنے کے لیے عملی مشقیں اور پروجیکٹس',
    industry: 'صنعتی معیارات',
    industryDesc: 'ROS 2، NVIDIA Isaac، اور پروڈکشن کے لیے تیار روبوٹکس پیٹرن سیکھیں',
    capstone: 'کیپسٹون پروجیکٹ',
    capstoneDesc: 'اپنے آخری پروجیکٹ کے طور پر ایک مکمل خود مختار ہیومنائیڈ سسٹم بنائیں',

    // Sections
    insideBook: 'کتاب کے اندر',
    chapterGuide: 'جامع ابواب کی رہنمائی',
    chapterGuideDesc: 'ہیومنائیڈ روبوٹکس ڈویلپمنٹ کے ہر پہلو کا احاطہ کرنے والے 40+ ابواب دریافت کریں',
    courseCurriculum: 'کورس نصاب',
    fourModules: 'مہارت کے لیے چار ماڈیولز',
    fourModulesDesc: 'بنیادی باتوں سے لے کر جدید AI سے چلنے والی روبوٹکس تک ایک منظم سیکھنے کا راستہ',
    yourJourney: 'آپ کا سفر',
    learningPath: 'منظم سیکھنے کا راستہ',
    learningPathDesc: 'ابتدائی سے روبوٹکس ماہر تک واضح روڈ میپ',
    techStack: 'ٹیکنالوجی اسٹیک',
    builtWith: 'صنعت کی معروف ٹولز کے ساتھ بنایا گیا',
    whatExperts: 'ماہرین کیا کہتے ہیں',
    trustedBy: 'صنعت کے رہنماؤں کا اعتماد',
    readyBuild: 'مستقبل بنانے کے لیے تیار ہیں؟',
    ctaDesc: 'آج ہی ہیومنائیڈ روبوٹکس میں اپنا سفر شروع کریں۔ کوئی پیشگی روبوٹکس تجربہ ضروری نہیں۔',
    beginJourney: 'اپنا سفر شروع کریں',
    learners: 'سیکھنے والے',
    rating: 'ریٹنگ',
    support: 'سپورٹ',

    // Module 1
    module1Title: 'ROS 2 کی بنیادیں',
    module1Subtitle: 'روبوٹک اعصابی نظام',
    module1Desc: 'نوڈز، ٹاپکس، سروسز اور ایکشنز میں مہارت حاصل کریں۔ ذہین روبوٹس کے لیے کمیونیکیشن بیک بون بنائیں۔',
    module1Topic1: 'نوڈز اور ٹاپکس',
    module1Topic2: 'سروسز اور ایکشنز',
    module1Topic3: 'URDF ماڈلز',
    module1Topic4: 'rclpy پروگرامنگ',
    module1Ch1: 'ROS 2 آرکیٹیکچر کا تعارف',
    module1Ch2: 'نوڈز، ٹاپکس اور میسج پاسنگ',
    module1Ch3: 'سروسز، ایکشنز اور پیرامیٹرز',
    module1Ch4: 'URDF اور روبوٹ ڈسکرپشن',
    module1Ch5: 'rclpy پروگرامنگ پیٹرنز',
    module1Ch6: 'لانچ فائلز اور کنفیگریشن',

    // Module 2
    module2Title: 'ڈیجیٹل ٹوئن سمولیشن',
    module2Subtitle: 'ورچوئل روبوٹکس لیب',
    module2Desc: 'Isaac Sim کے ساتھ فزکس درست سمولیشنز بنائیں۔ حقیقی تعیناتی سے پہلے محفوظ طریقے سے رویوں کی جانچ کریں۔',
    module2Topic1: 'فزکس سمولیشن',
    module2Topic2: 'سینسر ماڈلنگ',
    module2Topic3: 'ماحول ڈیزائن',
    module2Topic4: 'ریئل ٹائم سنک',
    module2Ch1: 'Isaac Sim ماحول کی تنصیب',
    module2Ch2: 'فزکس انجن کنفیگریشن',
    module2Ch3: 'سینسر سمولیشن اور ماڈلنگ',
    module2Ch4: 'ریئل ٹائم ہم آہنگی',
    module2Ch5: 'ماحول ڈیزائن',
    module2Ch6: 'ٹیسٹنگ اور توثیق',

    // Module 3
    module3Title: 'Isaac روبوٹک برین',
    module3Subtitle: 'ادراک اور نیویگیشن',
    module3Desc: 'NVIDIA Isaac ٹیکنالوجی کا استعمال کرتے ہوئے SLAM، بصری ادراک اور خود مختار نیویگیشن نافذ کریں۔',
    module3Topic1: 'VSLAM',
    module3Topic2: 'آبجیکٹ ڈیٹیکشن',
    module3Topic3: 'پاتھ پلاننگ',
    module3Topic4: 'Nav2 انٹیگریشن',
    module3Ch1: 'بصری SLAM نفاذ',
    module3Ch2: 'آبجیکٹ ڈیٹیکشن اور شناخت',
    module3Ch3: 'پاتھ پلاننگ الگورتھمز',
    module3Ch4: 'Nav2 انٹیگریشن',
    module3Ch5: 'ادراک پائپ لائن',
    module3Ch6: 'خود مختار نیویگیشن',

    // Module 4
    module4Title: 'وژن-لینگویج-ایکشن',
    module4Subtitle: 'AI سے چلنے والی خود مختاری',
    module4Desc: 'LLM پلاننگ کے ذریعے آواز کے احکامات کو روبوٹ ایکشنز سے جوڑیں۔ اینڈ ٹو اینڈ خود مختار سسٹمز بنائیں۔',
    module4Topic1: 'اسپیچ ریکگنیشن',
    module4Topic2: 'LLM پلاننگ',
    module4Topic3: 'ایکشن ایگزیکیوشن',
    module4Topic4: 'کیپسٹون پروجیکٹ',
    module4Ch1: 'Whisper کے ساتھ اسپیچ ریکگنیشن',
    module4Ch2: 'LLM انٹیگریشن اور پلاننگ',
    module4Ch3: 'ایکشن ایگزیکیوشن پائپ لائن',
    module4Ch4: 'ملٹی موڈل ریزننگ',
    module4Ch5: 'اینڈ ٹو اینڈ سسٹمز',
    module4Ch6: 'کیپسٹون پروجیکٹ',

    // Learning Path
    step1Title: 'بنیاد',
    step1Desc: 'ROS 2 کی بنیادیں سیکھیں',
    step1Duration: '2-3 ہفتے',
    step2Title: 'سمولیشن',
    step2Desc: 'ڈیجیٹل ٹوئنز بنائیں',
    step2Duration: '3-4 ہفتے',
    step3Title: 'ذہانت',
    step3Desc: 'AI صلاحیتیں شامل کریں',
    step3Duration: '4-5 ہفتے',
    step4Title: 'انٹیگریشن',
    step4Desc: 'مکمل خود مختار سسٹمز',
    step4Duration: '3-4 ہفتے',

    // Tech Stack
    tech1: 'ROS 2 جیزی',
    tech2: 'NVIDIA Isaac',
    tech3: 'پائتھون',
    tech4: 'OpenAI Whisper',
    tech5: 'LLMs',
    tech6: 'Nav2',

    // Testimonials
    testimonial1Quote: 'اس کتاب نے روبوٹکس کے بارے میں میری سمجھ کو بدل دیا۔ Isaac Sim کے ساتھ عملی نقطہ نظر نے پیچیدہ تصورات کو قابل رسائی بنا دیا۔',
    testimonial1Author: 'ڈاکٹر سارہ چن',
    testimonial1Role: 'روبوٹکس انجینئر، بوسٹن ڈائنامکس',
    testimonial2Quote: 'آخرکار، ایک جامع گائیڈ جو ROS 2 کی بنیادوں کو جدید AI انٹیگریشن سے جوڑتی ہے۔ ضروری پڑھائی۔',
    testimonial2Author: 'مارکس روڈریگز',
    testimonial2Role: 'لیڈ ڈیولپر، NVIDIA Isaac ٹیم',
    testimonial3Quote: 'صرف VLA ماڈیول پوری کتاب کے قابل ہے۔ روبوٹکس میں LLMs کے حقیقی دنیا کے استعمال شاندار طریقے سے بیان کیے گئے۔',
    testimonial3Author: 'ڈاکٹر ایملی واٹسن',
    testimonial3Role: 'AI ریسرچ لیڈ، OpenAI',

    // Explore button
    exploreModule: 'دریافت کریں',

    // Language selector
    selectLanguage: 'زبان منتخب کریں',
    specialUrdu: 'اردو میں پڑھیں',
  },
  ar: {
    badge: 'إصدار 2025 الجديد',
    heroTitle1: 'الذكاء الاصطناعي المادي',
    heroTitle2: 'والروبوتات البشرية',
    heroSubtitle: 'أتقن مجموعة الروبوتات الكاملة - من أساسيات ROS 2 إلى الأنظمة المستقلة المدعومة بالذكاء الاصطناعي. قم ببناء ومحاكاة ونشر الروبوتات البشرية الذكية.',
    startLearning: 'ابدأ التعلم',
    viewGithub: 'عرض على GitHub',
    modules: 'الوحدات',
    chapters: 'الفصول',
    examples: 'الأمثلة',
    scrollExplore: 'قم بالتمرير للاستكشاف',
    selectLanguage: 'اختر اللغة',
    specialUrdu: 'اقرأ بالأردية',
  },
  zh: {
    badge: '2025新版本',
    heroTitle1: '物理人工智能',
    heroTitle2: '与人形机器人',
    heroSubtitle: '掌握完整的机器人技术栈——从ROS 2基础到AI驱动的自主系统。构建、模拟和部署智能人形机器人。',
    startLearning: '开始学习',
    viewGithub: '在GitHub上查看',
    modules: '模块',
    chapters: '章节',
    examples: '示例',
    scrollExplore: '滚动探索',
    selectLanguage: '选择语言',
    specialUrdu: '用乌尔都语阅读',
  },
  hi: {
    badge: 'नया 2025 संस्करण',
    heroTitle1: 'फिजिकल AI',
    heroTitle2: 'और ह्यूमनॉइड रोबोटिक्स',
    heroSubtitle: 'पूर्ण रोबोटिक्स स्टैक में महारत हासिल करें — ROS 2 की बुनियाद से लेकर AI-संचालित स्वायत्त प्रणालियों तक। बुद्धिमान ह्यूमनॉइड रोबोट बनाएं, सिमुलेट करें और तैनात करें।',
    startLearning: 'सीखना शुरू करें',
    viewGithub: 'GitHub पर देखें',
    modules: 'मॉड्यूल',
    chapters: 'अध्याय',
    examples: 'उदाहरण',
    scrollExplore: 'एक्सप्लोर करने के लिए स्क्रॉल करें',
    selectLanguage: 'भाषा चुनें',
    specialUrdu: 'उर्दू में पढ़ें',
  },
  es: {
    badge: 'Nueva Edición 2025',
    heroTitle1: 'IA Física',
    heroTitle2: 'y Robótica Humanoide',
    heroSubtitle: 'Domina la pila completa de robótica — desde los fundamentos de ROS 2 hasta sistemas autónomos impulsados por IA. Construye, simula y despliega robots humanoides inteligentes.',
    startLearning: 'Comenzar a Aprender',
    viewGithub: 'Ver en GitHub',
    modules: 'Módulos',
    chapters: 'Capítulos',
    examples: 'Ejemplos',
    scrollExplore: 'Desplázate para explorar',
    selectLanguage: 'Seleccionar Idioma',
    specialUrdu: 'Leer en Urdu',
  },
  fr: {
    badge: 'Nouvelle Édition 2025',
    heroTitle1: 'IA Physique',
    heroTitle2: '& Robotique Humanoïde',
    heroSubtitle: 'Maîtrisez la pile robotique complète — des fondamentaux ROS 2 aux systèmes autonomes alimentés par l\'IA. Construisez, simulez et déployez des robots humanoïdes intelligents.',
    startLearning: 'Commencer à Apprendre',
    viewGithub: 'Voir sur GitHub',
    modules: 'Modules',
    chapters: 'Chapitres',
    examples: 'Exemples',
    scrollExplore: 'Faites défiler pour explorer',
    selectLanguage: 'Sélectionner la Langue',
    specialUrdu: 'Lire en Ourdou',
  },
  de: {
    badge: 'Neue Ausgabe 2025',
    heroTitle1: 'Physische KI',
    heroTitle2: '& Humanoide Robotik',
    heroSubtitle: 'Meistern Sie den kompletten Robotik-Stack — von ROS 2-Grundlagen bis hin zu KI-gesteuerten autonomen Systemen. Bauen, simulieren und implementieren Sie intelligente humanoide Roboter.',
    startLearning: 'Lernen Beginnen',
    viewGithub: 'Auf GitHub ansehen',
    modules: 'Module',
    chapters: 'Kapitel',
    examples: 'Beispiele',
    scrollExplore: 'Scrollen zum Erkunden',
    selectLanguage: 'Sprache Wählen',
    specialUrdu: 'Auf Urdu lesen',
  },
  ja: {
    badge: '2025年新版',
    heroTitle1: 'フィジカルAI',
    heroTitle2: 'とヒューマノイドロボティクス',
    heroSubtitle: 'ロボティクススタック全体をマスター — ROS 2の基礎からAI搭載の自律システムまで。インテリジェントなヒューマノイドロボットを構築、シミュレート、展開。',
    startLearning: '学習を開始',
    viewGithub: 'GitHubで見る',
    modules: 'モジュール',
    chapters: '章',
    examples: '例',
    scrollExplore: 'スクロールして探索',
    selectLanguage: '言語を選択',
    specialUrdu: 'ウルドゥー語で読む',
  },
  ko: {
    badge: '2025 새 에디션',
    heroTitle1: '물리적 AI',
    heroTitle2: '& 휴머노이드 로보틱스',
    heroSubtitle: '완전한 로보틱스 스택을 마스터하세요 — ROS 2 기초부터 AI 기반 자율 시스템까지. 지능형 휴머노이드 로봇을 구축, 시뮬레이션, 배포하세요.',
    startLearning: '학습 시작',
    viewGithub: 'GitHub에서 보기',
    modules: '모듈',
    chapters: '챕터',
    examples: '예제',
    scrollExplore: '스크롤하여 탐색',
    selectLanguage: '언어 선택',
    specialUrdu: '우르두어로 읽기',
  },
  pt: {
    badge: 'Nova Edição 2025',
    heroTitle1: 'IA Física',
    heroTitle2: '& Robótica Humanoide',
    heroSubtitle: 'Domine a pilha completa de robótica — desde os fundamentos do ROS 2 até sistemas autônomos alimentados por IA. Construa, simule e implante robôs humanoides inteligentes.',
    startLearning: 'Começar a Aprender',
    viewGithub: 'Ver no GitHub',
    modules: 'Módulos',
    chapters: 'Capítulos',
    examples: 'Exemplos',
    scrollExplore: 'Role para explorar',
    selectLanguage: 'Selecionar Idioma',
    specialUrdu: 'Ler em Urdu',
  },
  ru: {
    badge: 'Новое издание 2025',
    heroTitle1: 'Физический ИИ',
    heroTitle2: 'и Гуманоидная Робототехника',
    heroSubtitle: 'Освойте полный стек робототехники — от основ ROS 2 до автономных систем на базе ИИ. Создавайте, моделируйте и развертывайте интеллектуальных гуманоидных роботов.',
    startLearning: 'Начать Обучение',
    viewGithub: 'Смотреть на GitHub',
    modules: 'Модули',
    chapters: 'Главы',
    examples: 'Примеры',
    scrollExplore: 'Прокрутите для изучения',
    selectLanguage: 'Выбрать Язык',
    specialUrdu: 'Читать на урду',
  },
  tr: {
    badge: 'Yeni 2025 Sürümü',
    heroTitle1: 'Fiziksel Yapay Zeka',
    heroTitle2: '& İnsansı Robotik',
    heroSubtitle: 'Tam robotik yığınını ustalaşın — ROS 2 temellerinden yapay zeka destekli otonom sistemlere. Akıllı insansı robotlar oluşturun, simüle edin ve dağıtın.',
    startLearning: 'Öğrenmeye Başla',
    viewGithub: 'GitHub\'da Görüntüle',
    modules: 'Modüller',
    chapters: 'Bölümler',
    examples: 'Örnekler',
    scrollExplore: 'Keşfetmek için kaydırın',
    selectLanguage: 'Dil Seçin',
    specialUrdu: 'Urduca Oku',
  },
  id: {
    badge: 'Edisi Baru 2025',
    heroTitle1: 'AI Fisik',
    heroTitle2: '& Robotika Humanoid',
    heroSubtitle: 'Kuasai tumpukan robotika lengkap — dari dasar ROS 2 hingga sistem otonom bertenaga AI. Bangun, simulasikan, dan terapkan robot humanoid cerdas.',
    startLearning: 'Mulai Belajar',
    viewGithub: 'Lihat di GitHub',
    modules: 'Modul',
    chapters: 'Bab',
    examples: 'Contoh',
    scrollExplore: 'Gulir untuk menjelajah',
    selectLanguage: 'Pilih Bahasa',
    specialUrdu: 'Baca dalam Urdu',
  },
  bn: {
    badge: 'নতুন ২০২৫ সংস্করণ',
    heroTitle1: 'ফিজিক্যাল AI',
    heroTitle2: 'এবং হিউম্যানয়েড রোবোটিক্স',
    heroSubtitle: 'সম্পূর্ণ রোবোটিক্স স্ট্যাক আয়ত্ত করুন — ROS 2 ভিত্তি থেকে AI-চালিত স্বায়ত্তশাসিত সিস্টেম পর্যন্ত। বুদ্ধিমান হিউম্যানয়েড রোবট তৈরি, সিমুলেট এবং স্থাপন করুন।',
    startLearning: 'শেখা শুরু করুন',
    viewGithub: 'GitHub-এ দেখুন',
    modules: 'মডিউল',
    chapters: 'অধ্যায়',
    examples: 'উদাহরণ',
    scrollExplore: 'অন্বেষণ করতে স্ক্রোল করুন',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    specialUrdu: 'উর্দুতে পড়ুন',
  },

  // Easy Urdu - Simplified Urdu with easier vocabulary for beginners
  'ur-easy': {
    // Hero Section - Simple words
    badge: 'نیا 2025',
    heroTitle1: 'روبوٹ بنانا',
    heroTitle2: 'سیکھیں',
    heroSubtitle: 'روبوٹ بنانا سیکھیں۔ آسان طریقے سے۔ کوڈ لکھیں۔ روبوٹ چلائیں۔ مزے کریں!',
    startLearning: '🚀 شروع کریں',
    viewGithub: '📁 کوڈ دیکھیں',
    modules: 'حصے',
    chapters: 'سبق',
    examples: 'نمونے',
    scrollExplore: '👇 نیچے دیکھیں',

    // Robot Mascot - Friendly language
    mascotTitle1: 'خوش آمدید! 👋',
    mascotMsg1: 'میں روزا ہوں! میں آپ کو روبوٹ بنانا سکھاؤں گی۔ پریشان نہ ہوں - سب کچھ آسان ہے!',
    mascotTitle2: 'پہلے یہ سیکھیں',
    mascotMsg2: 'پہلے حصے سے شروع کریں۔ آہستہ آہستہ سیکھیں۔ جلدی نہیں کرنی۔',
    mascotTitle3: 'کر کے سیکھیں',
    mascotMsg3: 'صرف پڑھیں نہیں - ساتھ ساتھ کوڈ لکھیں۔ غلطیاں ہوں گی - کوئی بات نہیں!',
    mascotTitle4: 'ہم ساتھ ہیں',
    mascotMsg4: 'یہ کتاب خواتین نے بنائی۔ سب کچھ آسان بنایا۔ آپ ضرور کر سکتے ہیں!',

    // Features - Simple descriptions
    structuredLearning: 'ترتیب سے سیکھیں',
    structuredDesc: 'آسان سے مشکل - قدم بہ قدم',
    handsOn: 'کر کے سیکھیں',
    handsOnDesc: 'ہر سبق میں کوڈ لکھیں',
    industry: 'اصلی طریقے',
    industryDesc: 'وہی سیکھیں جو کمپنیاں استعمال کرتی ہیں',
    capstone: 'بڑا پروجیکٹ',
    capstoneDesc: 'آخر میں پورا روبوٹ بنائیں',

    // Sections
    insideBook: 'کتاب میں کیا ہے',
    chapterGuide: 'سارے سبق',
    chapterGuideDesc: '40 سے زیادہ سبق - سب کچھ سیکھیں',
    courseCurriculum: 'کورس',
    fourModules: 'چار حصے',
    fourModulesDesc: 'شروع سے ماہر بننے تک',
    yourJourney: 'آپ کا سفر',
    learningPath: 'سیکھنے کا راستہ',
    learningPathDesc: 'نئے سے ماہر بننے تک',
    techStack: 'ٹیکنالوجی',
    builtWith: 'یہ سب استعمال کریں گے',
    whatExperts: 'ماہرین کی رائے',
    trustedBy: 'بڑے لوگ کیا کہتے ہیں',
    readyBuild: 'شروع کریں؟',
    ctaDesc: 'آج سے روبوٹ بنانا سیکھیں۔ پہلے سے کچھ جاننا ضروری نہیں!',
    beginJourney: '✨ شروع کریں',
    learners: 'طالب علم',
    rating: 'ریٹنگ',
    support: 'مدد',

    // Module 1 - Simple language
    module1Title: 'روبوٹ کی بنیاد',
    module1Subtitle: 'روبوٹ کیسے بات کرتے ہیں',
    module1Desc: 'سیکھیں کہ روبوٹ کے پرزے آپس میں کیسے بات کرتے ہیں۔',
    module1Topic1: 'پیغام بھیجنا',
    module1Topic2: 'سوال جواب',
    module1Topic3: 'روبوٹ کی شکل',
    module1Topic4: 'کوڈ لکھنا',
    module1Ch1: 'روبوٹ سسٹم کیا ہے',
    module1Ch2: 'پیغام کیسے بھیجیں',
    module1Ch3: 'سوال کیسے کریں',
    module1Ch4: 'روبوٹ کی شکل بنانا',
    module1Ch5: 'پہلا کوڈ لکھیں',
    module1Ch6: 'پروگرام چلائیں',

    // Module 2 - Simple language
    module2Title: 'کمپیوٹر میں روبوٹ',
    module2Subtitle: 'پہلے کمپیوٹر میں آزمائیں',
    module2Desc: 'پہلے کمپیوٹر میں روبوٹ بنائیں۔ غلطی ہو تو کوئی نقصان نہیں۔',
    module2Topic1: 'فزکس',
    module2Topic2: 'سینسر',
    module2Topic3: 'ماحول',
    module2Topic4: 'لائیو',
    module2Ch1: 'سافٹ ویئر لگائیں',
    module2Ch2: 'فزکس سیٹ کریں',
    module2Ch3: 'سینسر لگائیں',
    module2Ch4: 'لائیو دیکھیں',
    module2Ch5: 'جگہ بنائیں',
    module2Ch6: 'ٹیسٹ کریں',

    // Module 3 - Simple language
    module3Title: 'روبوٹ کا دماغ',
    module3Subtitle: 'دیکھنا اور چلنا',
    module3Desc: 'روبوٹ کو دیکھنا اور چلنا سکھائیں۔',
    module3Topic1: 'نقشہ بنانا',
    module3Topic2: 'چیزیں دیکھنا',
    module3Topic3: 'راستہ ڈھونڈنا',
    module3Topic4: 'چلنا',
    module3Ch1: 'نقشہ کیسے بنائیں',
    module3Ch2: 'چیزیں کیسے پہچانیں',
    module3Ch3: 'راستہ کیسے ڈھونڈیں',
    module3Ch4: 'چلنا کیسے سکھائیں',
    module3Ch5: 'دیکھنا اور سمجھنا',
    module3Ch6: 'خود چلنا',

    // Module 4 - Simple language
    module4Title: 'بولنا اور سننا',
    module4Subtitle: 'روبوٹ سے بات کریں',
    module4Desc: 'روبوٹ کو بولنا سکھائیں۔ آواز سے حکم دیں۔',
    module4Topic1: 'سننا',
    module4Topic2: 'سوچنا',
    module4Topic3: 'کرنا',
    module4Topic4: 'پروجیکٹ',
    module4Ch1: 'آواز پہچاننا',
    module4Ch2: 'AI سے سوچنا',
    module4Ch3: 'کام کرنا',
    module4Ch4: 'سب ملا کر',
    module4Ch5: 'پورا سسٹم',
    module4Ch6: 'اپنا روبوٹ',

    // Learning Path - Simple
    step1Title: 'شروع',
    step1Desc: 'بنیاد سیکھیں',
    step1Duration: '2-3 ہفتے',
    step2Title: 'پریکٹس',
    step2Desc: 'کمپیوٹر میں بنائیں',
    step2Duration: '3-4 ہفتے',
    step3Title: 'دماغ',
    step3Desc: 'AI سیکھیں',
    step3Duration: '4-5 ہفتے',
    step4Title: 'مکمل',
    step4Desc: 'سب جوڑیں',
    step4Duration: '3-4 ہفتے',

    // Tech Stack
    tech1: 'ROS 2',
    tech2: 'NVIDIA Isaac',
    tech3: 'پائتھون',
    tech4: 'Whisper',
    tech5: 'AI',
    tech6: 'Nav2',

    // Testimonials - Simple
    testimonial1Quote: 'اس کتاب نے مجھے روبوٹ بنانا سکھایا۔ بہت آسان طریقے سے۔',
    testimonial1Author: 'ڈاکٹر سارہ',
    testimonial1Role: 'روبوٹ انجینئر',
    testimonial2Quote: 'سب کچھ اتنا آسان ہے کہ کوئی بھی سیکھ سکتا ہے۔',
    testimonial2Author: 'مارکس',
    testimonial2Role: 'NVIDIA',
    testimonial3Quote: 'AI والا حصہ بہت اچھا ہے۔ سب کو پڑھنا چاہیے۔',
    testimonial3Author: 'ڈاکٹر ایملی',
    testimonial3Role: 'AI ماہر',

    // Explore button
    exploreModule: 'دیکھیں',

    // Language selector
    selectLanguage: 'زبان بدلیں',
    specialUrdu: 'آسان اردو',
    easyUrdu: 'آسان اردو',
  },

  // Persian/Farsi
  fa: {
    badge: 'نسخه جدید ۲۰۲۵',
    heroTitle1: 'هوش مصنوعی فیزیکی',
    heroTitle2: 'و رباتیک انسان‌نما',
    heroSubtitle: 'بر کل پشته رباتیک مسلط شوید - از مبانی ROS 2 تا سیستم‌های خودمختار مبتنی بر هوش مصنوعی.',
    startLearning: 'شروع یادگیری',
    viewGithub: 'مشاهده در GitHub',
    modules: 'ماژول‌ها',
    chapters: 'فصل‌ها',
    examples: 'مثال‌ها',
    scrollExplore: 'برای کاوش اسکرول کنید',
    selectLanguage: 'انتخاب زبان',
    specialUrdu: 'خواندن به اردو',
  },

  // Hebrew
  he: {
    badge: 'מהדורה חדשה 2025',
    heroTitle1: 'AI פיזי',
    heroTitle2: 'ורובוטיקה הומנואידית',
    heroSubtitle: 'שלוט בסטאק הרובוטיקה המלא - מיסודות ROS 2 ועד מערכות אוטונומיות מונעות AI.',
    startLearning: 'התחל ללמוד',
    viewGithub: 'צפה ב-GitHub',
    modules: 'מודולים',
    chapters: 'פרקים',
    examples: 'דוגמאות',
    scrollExplore: 'גלול לחקירה',
    selectLanguage: 'בחר שפה',
    specialUrdu: 'קרא באורדו',
  },

  // Thai
  th: {
    badge: 'ฉบับใหม่ 2025',
    heroTitle1: 'AI ทางกายภาพ',
    heroTitle2: 'และหุ่นยนต์ฮิวแมนนอยด์',
    heroSubtitle: 'เชี่ยวชาญสแต็กหุ่นยนต์ทั้งหมด - ตั้งแต่พื้นฐาน ROS 2 ไปจนถึงระบบอัตโนมัติที่ขับเคลื่อนด้วย AI',
    startLearning: 'เริ่มเรียนรู้',
    viewGithub: 'ดูใน GitHub',
    modules: 'โมดูล',
    chapters: 'บท',
    examples: 'ตัวอย่าง',
    scrollExplore: 'เลื่อนเพื่อสำรวจ',
    selectLanguage: 'เลือกภาษา',
    specialUrdu: 'อ่านภาษาอูรดู',
  },

  // Vietnamese
  vi: {
    badge: 'Phiên bản mới 2025',
    heroTitle1: 'AI Vật lý',
    heroTitle2: '& Robot Hình người',
    heroSubtitle: 'Làm chủ toàn bộ stack robotics - từ nền tảng ROS 2 đến các hệ thống tự động được hỗ trợ bởi AI.',
    startLearning: 'Bắt đầu học',
    viewGithub: 'Xem trên GitHub',
    modules: 'Mô-đun',
    chapters: 'Chương',
    examples: 'Ví dụ',
    scrollExplore: 'Cuộn để khám phá',
    selectLanguage: 'Chọn ngôn ngữ',
    specialUrdu: 'Đọc bằng tiếng Urdu',
  },

  // Italian
  it: {
    badge: 'Nuova Edizione 2025',
    heroTitle1: 'AI Fisico',
    heroTitle2: '& Robotica Umanoide',
    heroSubtitle: 'Padroneggia lo stack completo della robotica — dai fondamenti di ROS 2 ai sistemi autonomi basati su AI.',
    startLearning: 'Inizia a Imparare',
    viewGithub: 'Vedi su GitHub',
    modules: 'Moduli',
    chapters: 'Capitoli',
    examples: 'Esempi',
    scrollExplore: 'Scorri per esplorare',
    selectLanguage: 'Seleziona Lingua',
    specialUrdu: 'Leggi in Urdu',
  },

  // Dutch
  nl: {
    badge: 'Nieuwe Editie 2025',
    heroTitle1: 'Fysieke AI',
    heroTitle2: '& Humanoïde Robotica',
    heroSubtitle: 'Beheers de complete robotics stack — van ROS 2 fundamenten tot AI-aangedreven autonome systemen.',
    startLearning: 'Begin met Leren',
    viewGithub: 'Bekijk op GitHub',
    modules: 'Modules',
    chapters: 'Hoofdstukken',
    examples: 'Voorbeelden',
    scrollExplore: 'Scroll om te verkennen',
    selectLanguage: 'Selecteer Taal',
    specialUrdu: 'Lees in Urdu',
  },

  // Polish
  pl: {
    badge: 'Nowa Edycja 2025',
    heroTitle1: 'Fizyczne AI',
    heroTitle2: 'i Robotyka Humanoidalna',
    heroSubtitle: 'Opanuj pełny stos robotyki — od podstaw ROS 2 po autonomiczne systemy napędzane AI.',
    startLearning: 'Zacznij Się Uczyć',
    viewGithub: 'Zobacz na GitHub',
    modules: 'Moduły',
    chapters: 'Rozdziały',
    examples: 'Przykłady',
    scrollExplore: 'Przewiń, aby eksplorować',
    selectLanguage: 'Wybierz Język',
    specialUrdu: 'Czytaj po Urdu',
  },

  // Ukrainian
  uk: {
    badge: 'Нове видання 2025',
    heroTitle1: 'Фізичний ШІ',
    heroTitle2: 'та Гуманоїдна Робототехніка',
    heroSubtitle: 'Опануйте повний стек робототехніки — від основ ROS 2 до автономних систем на базі ШІ.',
    startLearning: 'Почати Навчання',
    viewGithub: 'Переглянути на GitHub',
    modules: 'Модулі',
    chapters: 'Розділи',
    examples: 'Приклади',
    scrollExplore: 'Прокрутіть для вивчення',
    selectLanguage: 'Вибрати Мову',
    specialUrdu: 'Читати урду',
  },

  // Swahili
  sw: {
    badge: 'Toleo Jipya 2025',
    heroTitle1: 'AI ya Kimwili',
    heroTitle2: 'na Robotiki ya Kibinadamu',
    heroSubtitle: 'Jifunze stack kamili ya robotiki — kutoka misingi ya ROS 2 hadi mifumo ya kujiendesha inayoendeshwa na AI.',
    startLearning: 'Anza Kujifunza',
    viewGithub: 'Angalia kwenye GitHub',
    modules: 'Moduli',
    chapters: 'Sura',
    examples: 'Mifano',
    scrollExplore: 'Sogeza kuchunguza',
    selectLanguage: 'Chagua Lugha',
    specialUrdu: 'Soma kwa Kiurdu',
  },
};

interface TranslationContextType {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState('en');

  const currentLangData = languages.find(l => l.code === currentLang) || languages[0];
  const dir = currentLangData.dir as 'ltr' | 'rtl';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang, dir]);

  const t = (key: string): string => {
    const langTranslations = translations[currentLang] || translations.en;
    return langTranslations[key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang, t, dir, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
