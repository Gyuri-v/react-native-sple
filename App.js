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

/* 컴포넌트 */
import { BottomTabs } from './components/BottomTab';

/* 아이콘 */
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import DetailScreen from './components/Detail';
import { CalenderScreen } from './pages/Calender';
// import { Fontisto } from "@expo/vector-icons";
// import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={BottomTabs}
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Home',
            headerLeft: () => {
              const currentRoute = getFocusedRouteNameFromRoute(route) ?? 'Home';
              // Home 화면이 아닐 때만 뒤로가기 버튼 표시
              return currentRoute !== 'Home' ? (
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 15 }}
                >
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              ) : null;
            },
          })}
        />
        <Stack.Screen name="Calender" component={CalenderScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Skills" component={SkillList} />
      </Stack.Navigator> */}
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
        <Stack.Screen name="Calender" component={CalenderScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
