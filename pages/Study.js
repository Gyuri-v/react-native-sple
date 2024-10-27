import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { styles } from "./_style";
import List from '../components/List';
import PageTitle from '../components/PageTitle';

const data = [
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
];

/* 현재진행중인 공부 */
export function StudyScreen() {
  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="📚" title="Study" />
        <View style={styles.contents}>
          <List title="Study" data={data} />
        </View>
      </ScrollView>
    </View>
  );
}