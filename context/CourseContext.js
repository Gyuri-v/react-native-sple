// context/CourseContext.js
import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses([...courses, { id: Date.now(), ...newCourse }]);
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  return useContext(CourseContext);
};