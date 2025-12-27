import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const LearningProgress = () => {
  const { userProgress, loading, error, markChapterAsComplete, markExerciseAsComplete } = useProgress();

  if (loading) {
    return (
      <div className="exercise-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading progress data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exercise-container" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <p>Error loading progress: {error}</p>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="exercise-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No progress data available.</p>
      </div>
    );
  }

  const handleChapterComplete = (chapterTitle) => {
    markChapterAsComplete(chapterTitle);
  };

  const handleExerciseComplete = (exerciseId) => {
    markExerciseAsComplete(exerciseId);
  };

  return (
    <div className="exercise-container" role="region" aria-labelledby="progress-tracker-title">
      <h3 id="progress-tracker-title">Learning Progress Tracker</h3>

      <div style={{ marginBottom: '1.5rem' }} role="status" aria-live="polite">
        <h4>Overall Progress</h4>
        <div className="learning-progress-bar" role="progressbar" aria-valuenow={userProgress.overallProgress || 0} aria-valuemin="0" aria-valuemax="100" aria-label="Overall learning progress">
          <div
            className="learning-progress-fill"
            style={{ width: `${userProgress.overallProgress || 0}%` }}
            aria-hidden="true"
          ></div>
        </div>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }} aria-label={`Progress is ${userProgress.overallProgress || 0} percent complete`}>
          {userProgress.overallProgress || 0}% Complete
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }} role="group" aria-labelledby="chapter-progress-heading">
        <h4 id="chapter-progress-heading">Chapter Progress</h4>
        {userProgress.chapters?.map((chapter, index) => (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5>{chapter.title}</h5>
                <p>Status: {chapter.completed ? '✓ Completed' : '○ In Progress'}</p>
                <p>Exercises: {chapter.exercisesCompleted || 0}/{chapter.totalExercises || 1}</p>
              </div>
              {!chapter.completed && (
                <button
                  onClick={() => handleChapterComplete(chapter.title)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  aria-label={`Mark chapter ${chapter.title} as complete`}
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div role="group" aria-labelledby="exercises-heading">
        <h4 id="exercises-heading">Exercises</h4>
        {userProgress.exercises?.map((exercise, index) => (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5>{exercise.title}</h5>
                <p>Chapter: {exercise.chapter}</p>
                <p>Status: {exercise.completed ? '✓ Completed' : '○ Not Started'}</p>
              </div>
              {!exercise.completed && (
                <button
                  onClick={() => handleExerciseComplete(exercise.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  aria-label={`Mark exercise ${exercise.title} as complete`}
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningProgress;