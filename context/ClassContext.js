// context/ClassContext.js
import React, { createContext, useState, useContext } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([
    {
      id: '1',
      title: '노마드코더) React Basics',
      skills: ['react', 'javascript'],
      icon: 'R',
      progress: 0,
    },
    {
      id: '2',
      title: '인프런) CSS 마스터',
      skills: ['css', 'next'],
      icon: 'C',
      progress: 0,
    },
    {
      id: '3',
      title: '노마드코더) TypeScript',
      skills: ['typescript'],
      icon: 'T',
      progress: 0,
    },
  ]);

  const addClass = (newClass) => {
    setClasses([
      ...classes,
      {
        id: Date.now().toString(),
        ...newClass,
        progress: 0,
      }
    ]);
  };

  return (
    <ClassContext.Provider value={{ classes, addClass }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => useContext(ClassContext);