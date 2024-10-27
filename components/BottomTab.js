import { StatusBar } from 'expo-status-bar';

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

/* 스타일 */
import { styles } from '../pages/_style';

/* 페이지 */
import { HomeScreen } from '../pages/Home';
import { TasksScreen } from '../pages/Task';
import { SubjectScreen } from '../pages/Subject';
import { ClassScreen } from '../pages/Class';
import { StudyScreen } from '../pages/Study';
import { CalenderScreen } from '../pages/Calender';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator 설정
export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          switch (route.name) {
            case 'Home':
              return <Text style={styles.navi.icon}>🏠</Text>;
            case 'Calendar':
              return <Text style={styles.navi.icon}>📅</Text>;
            case 'Class':
              return <Text style={styles.navi.icon}>👩🏻‍🏫</Text>;
            case 'Subject':
              return <Text style={styles.navi.icon}>📘</Text>;
            case 'Study':
              return <Text style={styles.navi.icon}>📚</Text>;
            case 'Tasks':
              return <Text style={styles.navi.icon}>📝</Text>;
            // case 'Calender':
            //   return <Text style={styles.navi.icon}>📅</Text>;
            default:
              return <Text style={styles.navi.icon}>👩🏻‍💻</Text>;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Calender" component={CalenderScreen} /> */}
      <Tab.Screen name="Class" component={ClassScreen} />
      <Tab.Screen name="Subject" component={SubjectScreen} />
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
    </Tab.Navigator>
  );
}