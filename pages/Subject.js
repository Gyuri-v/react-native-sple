import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { styles } from "./_style";
import SkillList from '../components/SkillList';
import PageTitle from '../components/PageTitle';

const skills = [
  { name: 'React', router: 'Datail', image: require('../assets/skill-react.png')  },
  { name: 'TypeScript', router: 'Datail', image: require('../assets/skill-typeScript.png')  },
  { name: 'CSS', router: 'StudyDatailScreen', image: require('../assets/skill-css.png')  },
  { name: 'Javascript', router: 'Datail', image: require('../assets/skill-js.png')  },
  { name: 'Next.js', router: 'Datail', image: require('../assets/skill-next.png')  },
];

/* 스택들 */
export function SubjectScreen() {
  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="📘" title="Subject" />
        <View style={styles.contents}>
          <SkillList title="Subjects" data={skills} />
        </View>
      </ScrollView>
    </View>
  );
}