// context/CalendarContext.js
import React, { createContext, useState, useContext } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [studyDays, setStudyDays] = useState({
    // 예시 데이터
    '2024-12-07': {
      studies: [
        { id: 1, subject: 'React', icon: '⚛️', completed: true },
        { id: 2, subject: 'TypeScript', icon: '📘', completed: false }
      ]
    },
    '2024-12-06': {
      studies: [
        { id: 3, subject: 'CSS', icon: '🎨', completed: true }
      ]
    }
  });

  const addStudyGoal = (date, study) => {
    setStudyDays(prev => ({
      ...prev,
      [date]: {
        studies: [...(prev[date]?.studies || []), {
          id: Date.now(),
          ...study
        }]
      }
    }));
  };

  const toggleStudyCompletion = (date, studyId) => {
    setStudyDays(prev => ({
      ...prev,
      [date]: {
        studies: prev[date].studies.map(study =>
          study.id === studyId
            ? { ...study, completed: !study.completed }
            : study
        )
      }
    }));
  };

  const removeStudyGoal = (date, studyId) => {
    setStudyDays(prev => ({
      ...prev,
      [date]: {
        studies: prev[date].studies.filter(study => study.id !== studyId)
      }
    }));
  };

  return (
    <CalendarContext.Provider 
      value={{ 
        studyDays, 
        addStudyGoal, 
        toggleStudyCompletion,
        removeStudyGoal 
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);