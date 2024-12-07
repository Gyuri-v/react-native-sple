import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { styles } from "./_style";
import UserProfile from '../components/UserProfile';
import PageList from '../components/PageList';
import TaskList from '../components/TaskList';
import List from '../components/List';
import PageTitle from '../components/PageTitle';
import SkillList from '../components/SkillList';
import { useClassContext } from '../context/ClassContext';
import { useSubjectContext } from '../context/SubjectContext';
import { useStudyContext } from '../context/StudyContext';



export function HomeScreen() {
  const { classes } = useClassContext();
  const { subjects } = useSubjectContext();
  const { studyItems } = useStudyContext();
  
  // 샘플 데이터
  const tasks = [
    {
      id: '1',
      icon: 'book',
      title: '수학 과제',
      progress: 75,
      isCompleted: false,
      completionDate: '',
    },
    {
      id: '2',
      icon: 'pencil',
      title: '영어 에세이',
      progress: 100,
      isCompleted: true,
      completionDate: '2024-10-25',
    },
    {
      id: '3',
      icon: 'flask',
      title: '과학 실험 보고서',
      progress: 30,
      isCompleted: false,
      completionDate: '',
    },
  ];


  const recentData = [
    {
      id: '1',
      category: 'class',
      title: 'React Basics',
      skills: ['react', 'javascript'],
      icon: '👩🏻‍🏫',
    },
    {
      id: '2',
      category: 'study',
      title: 'Advanced CSS',
      skills: ['css', 'next'],
      icon: '📚',
    },
    {
      id: '3',
      category: 'class',
      title: 'TypeScript Essentials',
      skills: ['typescript'],
      icon: '👩🏻‍🏫',
    },
  ];


  return (
    <View style={styles.container}>

      {/* header */}
      {/* <View style={styles.header}>
        <Text style={styles.header.text}>🔥 스플</Text>
      </View> */}
      <PageTitle icon="🔥" title="스플" />

      {/* contents */}
      <ScrollView>
        <View style={styles.contents}>
          <UserProfile />
          <View style={styles.box}>
            <PageList />
          </View>
          <View style={styles.box}>
            <Text style={styles.subTitle}>나의 스킬트리</Text>
            <SkillList title="Subjects" data={subjects} />
          </View>
          <View style={styles.box}>
            <Text style={styles.subTitle}>최근 Class</Text>
            <TaskList title="진행중인 과제" tasks={classes} />
          </View>
          <View style={styles.box}>
            <Text style={styles.subTitle}>최근 Study</Text>
            <List data={studyItems} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


