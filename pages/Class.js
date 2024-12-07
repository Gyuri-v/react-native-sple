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
import { useClassContext } from '../context/ClassContext';

/* 강의리스트 */
export function ClassScreen() {
  const { classes } = useClassContext();
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="👩🏻‍🏫" title="Class" />
        <View style={styles.contents}>
          <List data={classes} />
        </View>
      </ScrollView>
    </View>
  );
}