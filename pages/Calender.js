import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
} from "react-native";

import { styles } from "./_style";

/* 캘린더 */
export function CalenderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Calender!</Text>
    </View>
  );
}