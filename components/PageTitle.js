import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PageTitle = ({ icon, title }) => {
  return (
    <View style={styles.heading}>
      <View style={styles.icon}>
        <Text style={styles.icon.text}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    text: {
      fontSize: 30,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PageTitle;
