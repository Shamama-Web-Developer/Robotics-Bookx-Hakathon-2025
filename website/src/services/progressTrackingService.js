// website/src/services/progressTrackingService.js
// Service layer for learning progress tracking functionality

// Get user's progress through the digital twin robotics module
export const getUserProgress = async (userId = 'default-user') => {
  // In a real implementation, this would fetch from a backend
  // For now, we'll return mock data
  const mockProgress = {
    userId,
    module: 'digital-twin-robotics',
    chapters: [
      {
        title: 'Physics Simulation',
        completed: false,
        completionDate: null,
        exercisesCompleted: 0,
        totalExercises: 1,
        timeSpent: 0 // in minutes
      },
      {
        title: 'High-Fidelity Rendering',
        completed: false,
        completionDate: null,
        exercisesCompleted: 0,
        totalExercises: 1,
        timeSpent: 0
      },
      {
        title: 'Sensor Simulation',
        completed: false,
        completionDate: null,
        exercisesCompleted: 0,
        totalExercises: 1,
        timeSpent: 0
      }
    ],
    exercises: [
      {
        id: 'physics-ex1',
        title: 'Basic Robot Drop Simulation',
        chapter: 'Physics Simulation',
        completed: false,
        completionDate: null
      },
      {
        id: 'rendering-ex1',
        title: 'Lighting and Shadow Effects',
        chapter: 'High-Fidelity Rendering',
        completed: false,
        completionDate: null
      },
      {
        id: 'sensor-ex1',
        title: 'Sensor Data Analysis',
        chapter: 'Sensor Simulation',
        completed: false,
        completionDate: null
      }
    ],
    overallProgress: 0, // percentage
    timeSpent: 0, // in minutes
    lastAccessed: new Date().toISOString(),
    estimatedTimeRemaining: 180 // in minutes
  };
  
  return mockProgress;
};

// Update user's progress
export const updateUserProgress = async (userId, progressData) => {
  // In a real implementation, this would update a backend
  // For now, we'll just validate and return the data
  console.log(`Updating progress for user ${userId}:`, progressData);
  
  // Validate required fields
  if (!progressData.chapterTitle && !progressData.exerciseId) {
    throw new Error('Either chapterTitle or exerciseId must be provided');
  }
  
  return {
    success: true,
    userId,
    progressData,
    timestamp: new Date().toISOString()
  };
};

// Mark a chapter as completed
export const markChapterComplete = async (userId, chapterTitle) => {
  console.log(`Marking chapter "${chapterTitle}" as complete for user ${userId}`);
  
  // Update local progress tracking
  const currentProgress = await getUserProgress(userId);
  const updatedChapters = currentProgress.chapters.map(chapter => {
    if (chapter.title === chapterTitle) {
      return {
        ...chapter,
        completed: true,
        completionDate: new Date().toISOString()
      };
    }
    return chapter;
  });
  
  return {
    success: true,
    userId,
    chapterTitle,
    updatedChapters,
    timestamp: new Date().toISOString()
  };
};

// Mark an exercise as completed
export const markExerciseComplete = async (userId, exerciseId) => {
  console.log(`Marking exercise "${exerciseId}" as complete for user ${userId}`);
  
  const currentProgress = await getUserProgress(userId);
  const updatedExercises = currentProgress.exercises.map(exercise => {
    if (exercise.id === exerciseId) {
      return {
        ...exercise,
        completed: true,
        completionDate: new Date().toISOString()
      };
    }
    return exercise;
  });
  
  // Also update the corresponding chapter's exercise count
  const chapterName = updatedExercises.find(ex => ex.id === exerciseId)?.chapter;
  const updatedChapters = currentProgress.chapters.map(chapter => {
    if (chapter.title === chapterName) {
      return {
        ...chapter,
        exercisesCompleted: chapter.exercisesCompleted + 1
      };
    }
    return chapter;
  });
  
  return {
    success: true,
    userId,
    exerciseId,
    updatedExercises,
    updatedChapters,
    timestamp: new Date().toISOString()
  };
};

// Get all exercises for a module
export const getModuleExercises = async (moduleTitle) => {
  // For our digital twin robotics module
  if (moduleTitle === 'digital-twin-robotics') {
    return [
      {
        id: 'physics-ex1',
        title: 'Basic Robot Drop Simulation',
        description: 'Understand how gravity and physics parameters affect robot behavior',
        chapter: 'Physics Simulation',
        difficulty: 'Beginner',
        estimatedTime: 30 // minutes
      },
      {
        id: 'rendering-ex1',
        title: 'Lighting and Shadow Effects',
        description: 'Explore how lighting parameters affect robot visualization',
        chapter: 'High-Fidelity Rendering',
        difficulty: 'Intermediate',
        estimatedTime: 45
      },
      {
        id: 'sensor-ex1',
        title: 'Sensor Data Analysis',
        description: 'Analyze sensor data and understand noise characteristics',
        chapter: 'Sensor Simulation',
        difficulty: 'Intermediate',
        estimatedTime: 60
      }
    ];
  }
  
  return [];
};

// Calculate overall progress percentage
export const calculateOverallProgress = async (userId) => {
  const progress = await getUserProgress(userId);
  
  // Calculate based on completed chapters and exercises
  const totalChapters = progress.chapters.length;
  const completedChapters = progress.chapters.filter(c => c.completed).length;
  
  const totalExercises = progress.exercises.length;
  const completedExercises = progress.exercises.filter(e => e.completed).length;
  
  // Weight chapters and exercises equally for now
  const chapterProgress = (completedChapters / totalChapters) * 50; // 50% of total
  const exerciseProgress = (completedExercises / totalExercises) * 50; // 50% of total
  const overallProgress = chapterProgress + exerciseProgress;
  
  return {
    userId,
    overallProgress: Math.round(overallProgress * 100) / 100, // Round to 2 decimal places
    completedChapters,
    totalChapters,
    completedExercises,
    totalExercises
  };
};

// Save current session data
export const saveSessionData = async (userId, sessionData) => {
  console.log(`Saving session data for user ${userId}:`, sessionData);
  
  // In a real implementation, this would save to a database
  // For now, we'll just return success
  return {
    success: true,
    userId,
    sessionData,
    timestamp: new Date().toISOString()
  };
};