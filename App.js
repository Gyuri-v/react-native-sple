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

/* context */
import { CourseProvider } from './context/CourseContext';

/* 컴포넌트 */
import { BottomTabs } from './components/BottomTab';

/* 아이콘 */
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import DetailScreen from './components/Detail';
import { CalenderScreen } from './pages/Calender';
import { StudyProvider } from './context/StudyContext';
import { SubjectProvider } from './context/SubjectContext';
import AddSubjectScreen from './components/WriteSubject'
import AddCourseScreen from './components/WriteStudy';
import SubjectDetailScreen from './components/DetailSubject';
import StudyDetailScreen from './components/DetailStudy';
import ClassDetailScreen from './components/DetailClass';
import { ClassProvider } from './context/ClassContext';
import AddClassScreen from './components/WriteClass';
import { CalendarProvider } from './context/CalendarContext';
// import { Fontisto } from "@expo/vector-icons";
// import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <CalendarProvider>
      <StudyProvider>
        <SubjectProvider>
          <ClassProvider>
            <NavigationContainer>
              <Stack.Navigator
                // 공통 screenOptions 설정
                screenOptions={({ route, navigation }) => ({
                  headerTitle: getFocusedRouteNameFromRoute(route) ?? route.name,
                  headerLeft: () => {
                    const currentRoute = getFocusedRouteNameFromRoute(route) ?? route.name;

                    return currentRoute == 'Home' ? null : 
                    <TouchableOpacity 
                      onPress={() => navigation.goBack()}
                      style={{ marginLeft: 15 }}
                    >
                      <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>;
                  },
                })}
              >
                <Stack.Screen name="Home" component={BottomTabs} />
                {/* <Stack.Screen name="Calender" component={CalenderScreen} /> */}
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="WriteSubject" component={AddSubjectScreen} />
                <Stack.Screen name="WriteStudy" component={AddCourseScreen} />
                <Stack.Screen name="WriteClass" component={AddClassScreen} />

                <Stack.Screen 
                  name="SubjectDetail" 
                  component={SubjectDetailScreen}
                  options={({ route }) => ({ 
                    title: route.params.subject.name,
                    headerBackTitle: '뒤로' 
                  })}
                />
                <Stack.Screen 
                  name="StudyDetail" 
                  component={StudyDetailScreen}
                  options={({ route }) => ({ 
                    title: route.params.item.title,
                    headerBackTitle: '뒤로'
                  })}
                />
                <Stack.Screen 
                  name="ClassDetail" 
                  component={ClassDetailScreen}
                  options={({ route }) => ({ 
                    title: '강의 상세',
                    headerBackTitle: '뒤로'
                  })}
                />

                <Stack.Screen 
                  name="Calendar" 
                  component={CalenderScreen}
                  options={{ 
                    title: '포토 캘린더',
                    headerBackTitle: '뒤로',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ClassProvider>
        </SubjectProvider>
      </StudyProvider>
    </CalendarProvider>
  );
}
