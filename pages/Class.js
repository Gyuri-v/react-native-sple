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
    title: '노마드코더) React Basics',
    skills: ['react', 'javascript'],
    icon: 'R',
    // image: require('./assets/skill-react.png')
  },
  {
    id: '2',
    title: '인프런) CSS 마스터',
    skills: ['css', 'next'],
    icon: 'C',
    // image: require('./assets/skill-css.png')
  },
  {
    id: '3',
    title: '노마드코더) TypeScript',
    skills: ['typescript'],
    icon: 'T',
    // image: require('./assets/skill-typescript.png')
  },
];

/* 강의리스트 */
export function ClassScreen() {
  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="👩🏻‍🏫" title="Class" />
        <View style={styles.contents}>
          <List data={data} />
        </View>
      </ScrollView>
    </View>
  );
}