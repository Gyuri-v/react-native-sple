import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./_style";
import List from '../components/List';
import PageTitle from '../components/PageTitle';
import { useNavigation } from '@react-navigation/native';
import { useStudyContext } from '../context/StudyContext';

/* 현재진행중인 공부 */
export function StudyScreen() {
  const { studyItems } = useStudyContext();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="📚" title="Study" />
        <View style={styles.contents}>
          <List title="Study" data={studyItems} />
        </View>
      </ScrollView>
    </View>
  );
}