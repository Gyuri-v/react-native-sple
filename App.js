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
// import { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";



import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TasksScreen } from './pages/Task';
import { styles } from './pages/style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.header.text}>🔥 스플</Text>
      </View>

      <View style={styles.contents}>
        {/* user */}
        <View style={styles.user}>
          <View style={styles.user.image}>
            <Text style={styles.user.image.text}>👩🏻‍💻</Text>
          </View>
          <View style={styles.user.info}>
            <Text style={styles.user.info.name}>박규리</Text>
            <Text style={styles.user.info.text}>오늘도 화이팅 👏🏻</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* 스택리스트 */
function SubjectScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chart!</Text>
    </View>
  );
}

/* 강의리스트 */
function ClassScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Market!</Text>
    </View>
  );
}

/* 현재진행중인 공부 */
function StudyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Issue!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



/*  */
// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Tasks" component={TasksScreen} />
//       </Stack.Navigator> */}
    
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarStyle: {},
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;


//             if (route.name === 'Home') { return <Text style={styles.navi.icon}>🏠</Text> }
//             else if (route.name === 'Calendar') { return <Text style={styles.navi.icon}>📅</Text> }
//             else if (route.name === 'Class') { return <Text style={styles.navi.icon}>👩🏻‍🏫</Text> }
//             else if (route.name === 'Subject') { return <Text style={styles.navi.icon}>📘</Text> }
//             else if (route.name === 'Study') { return <Text style={styles.navi.icon}>📚</Text> }
//             else if (route.name === 'Tasks') { return <Text style={styles.navi.icon}>📝</Text> }

//             return <Text style={styles.navi.icon}>👩🏻‍💻</Text>;
//           },

//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Class" component={ClassScreen} />
//         <Tab.Screen name="Subject" component={Subjectcreen} />
//         <Tab.Screen name="Study" component={StudyScreen} />
//         <Tab.Screen name="Tasks" component={TasksScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }


// Tab Navigator 설정
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
            default:
              return <Text style={styles.navi.icon}>👩🏻‍💻</Text>;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Class" component={ClassScreen} />
      <Tab.Screen name="Subject" component={SubjectScreen} />
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main"
          component={MyTabs}
          options={({ navigation }) => ({
            // title: 'Welcome',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Back"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
