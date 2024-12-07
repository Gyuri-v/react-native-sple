// context/StudyContext.js
import React, { createContext, useState, useContext } from 'react';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [studyItems, setStudyItems] = useState([
    {
      id: '1',
      category: 'study',
      title: 'React Todo 리스트',
      skills: ['react', 'javascript'],
      icon: '👾',
    },
    {
      id: '2',
      category: 'study',
      title: '스크롤 모션 템플릿화',
      skills: ['css', 'next'],
      icon: '🦴',
    },
  ]);

  const addStudyItem = (newItem) => {
    setStudyItems([
      ...studyItems,
      {
        id: Date.now().toString(),
        category: 'study',
        ...newItem,
      }
    ]);
  };

  return (
    <StudyContext.Provider value={{ studyItems, addStudyItem }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudyContext = () => useContext(StudyContext);