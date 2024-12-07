// context/SubjectContext.js
import React, { createContext, useState, useContext } from 'react';

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([
    {
      name: 'React',
      image: require('../assets/skill-react.png'),
      description: 'React는 페이스북에서 개발한 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다.',
      category: '프론트엔드 프레임워크',
      resources: {
        officialDocs: 'https://reactjs.org',
        recommendedCourse: 'https://example.com/react-course',
        githubRepo: 'https://github.com/facebook/react'
      },
      projects: [
        {
          title: 'TODO 리스트 만들기',
          description: '기본적인 CRUD 기능을 구현하는 프로젝트'
        }
      ],
      progress: 60,
    },
    {
      name: 'Javascript',
      image: require('../assets/skill-js.png'),
      description: 'JavaScript는 웹의 프로그래밍 언어로, 동적이고 인터랙티브한 웹 경험을 만드는 데 사용됩니다. 브라우저에서 실행되는 클라이언트 사이드 스크립팅부터 서버 사이드 개발까지 다양한 용도로 활용됩니다.',
      category: '프로그래밍 언어',
      resources: {
        officialDocs: 'https://developer.mozilla.org/ko/docs/Web/JavaScript',
        recommendedCourse: 'https://javascript.info',
        githubRepo: 'https://github.com/topics/javascript'
      },
      projects: [
        {
          title: '일정 관리 앱',
          description: '바닐라 JS로 구현하는 캘린더 및 일정 관리 애플리케이션'
        },
        {
          title: '게임 만들기',
          description: 'JavaScript를 활용한 간단한 브라우저 게임 개발'
        }
      ],
      progress: 75,
    },
    {
      name: 'Next.js',
      image: require('../assets/skill-next.png'),
      description: 'Next.js는 React 기반의 풀스택 웹 애플리케이션 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트 생성, API 라우트 등 다양한 기능을 제공하여 확장 가능한 애플리케이션을 구축할 수 있습니다.',
      category: '풀스택 프레임워크',
      resources: {
        officialDocs: 'https://nextjs.org/docs',
        recommendedCourse: 'https://nextjs.org/learn',
        githubRepo: 'https://github.com/vercel/next.js'
      },
      projects: [
        {
          title: '블로그 플랫폼',
          description: 'Next.js를 활용한 마크다운 기반 블로그 시스템 구축'
        },
        {
          title: '대시보드 애플리케이션',
          description: 'Next.js와 데이터 시각화 도구를 활용한 관리자 대시보드'
        }
      ],
      progress: 45,
    }
  ]);

  const addSubject = (newSubject) => {
    setSubjects([...subjects, { ...newSubject, progress: 0 }]);
  };

  const updateProgress = (subjectName, newProgress) => {
    setSubjects(subjects.map(subject => 
      subject.name === subjectName 
        ? { ...subject, progress: newProgress }
        : subject
    ));
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, updateProgress }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubjectContext = () => useContext(SubjectContext);