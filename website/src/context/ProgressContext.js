// website/src/context/ProgressContext.js
// Context for managing learning progress across the digital twin robotics module

import React, { createContext, useContext, useReducer } from 'react';
import {
  getUserProgress,
  updateUserProgress,
  markChapterComplete,
  markExerciseComplete,
  calculateOverallProgress
} from '../services/progressTrackingService';

// Initial state for the progress context
const initialState = {
  userProgress: null,
  loading: true,
  error: null,
};

// Action types
const actionTypes = {
  SET_PROGRESS_START: 'SET_PROGRESS_START',
  SET_PROGRESS_SUCCESS: 'SET_PROGRESS_SUCCESS',
  SET_PROGRESS_ERROR: 'SET_PROGRESS_ERROR',
  UPDATE_CHAPTER_PROGRESS: 'UPDATE_CHAPTER_PROGRESS',
  UPDATE_EXERCISE_PROGRESS: 'UPDATE_EXERCISE_PROGRESS',
  CALCULATE_OVERALL_PROGRESS: 'CALCULATE_OVERALL_PROGRESS',
};

// Reducer function
const progressReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PROGRESS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case actionTypes.SET_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        userProgress: action.payload,
        error: null,
      };
    
    case actionTypes.SET_PROGRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case actionTypes.UPDATE_CHAPTER_PROGRESS:
      if (!state.userProgress) return state;
      
      const updatedChapters = state.userProgress.chapters.map(chapter => {
        if (chapter.title === action.payload.chapterTitle) {
          return {
            ...chapter,
            ...action.payload.updates
          };
        }
        return chapter;
      });
      
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          chapters: updatedChapters,
        }
      };
    
    case actionTypes.UPDATE_EXERCISE_PROGRESS:
      if (!state.userProgress) return state;
      
      const updatedExercises = state.userProgress.exercises.map(exercise => {
        if (exercise.id === action.payload.exerciseId) {
          return {
            ...exercise,
            ...action.payload.updates
          };
        }
        return exercise;
      });
      
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          exercises: updatedExercises,
        }
      };
    
    case actionTypes.CALCULATE_OVERALL_PROGRESS:
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          overallProgress: action.payload.overallProgress
        }
      };
    
    default:
      return state;
  }
};

// Create context
const ProgressContext = createContext();

// Provider component
export const ProgressProvider = ({ children, userId = 'default-user' }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load user progress on initial render
  React.useEffect(() => {
    const loadUserProgress = async () => {
      dispatch({ type: actionTypes.SET_PROGRESS_START });
      try {
        const progress = await getUserProgress(userId);
        dispatch({ type: actionTypes.SET_PROGRESS_SUCCESS, payload: progress });
        
        // Calculate overall progress
        const overallProgress = await calculateOverallProgress(userId);
        dispatch({ 
          type: actionTypes.CALCULATE_OVERALL_PROGRESS, 
          payload: { overallProgress: overallProgress.overallProgress } 
        });
      } catch (error) {
        dispatch({ type: actionTypes.SET_PROGRESS_ERROR, payload: error.message });
      }
    };

    loadUserProgress();
  }, [userId]);

  // Actions
  const updateChapterProgress = async (chapterTitle, updates) => {
    try {
      dispatch({ 
        type: actionTypes.UPDATE_CHAPTER_PROGRESS, 
        payload: { chapterTitle, updates } 
      });
      
      // Persist the changes to the backend
      await updateUserProgress(userId, { chapterTitle, updates });
    } catch (error) {
      console.error('Error updating chapter progress:', error);
    }
  };

  const updateExerciseProgress = async (exerciseId, updates) => {
    try {
      dispatch({ 
        type: actionTypes.UPDATE_EXERCISE_PROGRESS, 
        payload: { exerciseId, updates } 
      });
      
      // Persist the changes to the backend
      await updateUserProgress(userId, { exerciseId, updates });
    } catch (error) {
      console.error('Error updating exercise progress:', error);
    }
  };

  const markChapterAsComplete = async (chapterTitle) => {
    try {
      const result = await markChapterComplete(userId, chapterTitle);
      
      dispatch({ 
        type: actionTypes.UPDATE_CHAPTER_PROGRESS, 
        payload: { 
          chapterTitle, 
          updates: { 
            completed: true, 
            completionDate: result.timestamp 
          } 
        } 
      });
      
      // Recalculate overall progress after chapter completion
      const overallProgress = await calculateOverallProgress(userId);
      dispatch({ 
        type: actionTypes.CALCULATE_OVERALL_PROGRESS, 
        payload: { overallProgress: overallProgress.overallProgress } 
      });
    } catch (error) {
      console.error('Error marking chapter as complete:', error);
    }
  };

  const markExerciseAsComplete = async (exerciseId) => {
    try {
      const result = await markExerciseComplete(userId, exerciseId);
      
      dispatch({ 
        type: actionTypes.UPDATE_EXERCISE_PROGRESS, 
        payload: { 
          exerciseId, 
          updates: { 
            completed: true, 
            completionDate: result.timestamp 
          } 
        } 
      });
      
      // Update the corresponding chapter's exercise count
      const exercise = state.userProgress?.exercises.find(ex => ex.id === exerciseId);
      if (exercise) {
        const chapterName = exercise.chapter;
        const chapter = state.userProgress?.chapters.find(ch => ch.title === chapterName);
        if (chapter) {
          dispatch({ 
            type: actionTypes.UPDATE_CHAPTER_PROGRESS, 
            payload: { 
              chapterTitle: chapterName, 
              updates: { 
                exercisesCompleted: (chapter.exercisesCompleted || 0) + 1
              } 
            } 
          });
        }
      }
      
      // Recalculate overall progress after exercise completion
      const overallProgress = await calculateOverallProgress(userId);
      dispatch({ 
        type: actionTypes.CALCULATE_OVERALL_PROGRESS, 
        payload: { overallProgress: overallProgress.overallProgress } 
      });
    } catch (error) {
      console.error('Error marking exercise as complete:', error);
    }
  };

  const value = {
    ...state,
    updateChapterProgress,
    updateExerciseProgress,
    markChapterAsComplete,
    markExerciseAsComplete,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;