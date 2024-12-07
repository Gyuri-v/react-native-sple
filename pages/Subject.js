import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { styles } from "./_style";
import SkillList from '../components/SkillList';
import PageTitle from '../components/PageTitle';
import { useSubjectContext } from '../context/SubjectContext';

/* 스택들 */
export function SubjectScreen() {
  const { subjects } = useSubjectContext();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="📘" title="Subject" />
        <View style={styles.contents}>
          <SkillList title="Subjects" data={subjects} />
        </View>
      </ScrollView>
    </View>
  );
}