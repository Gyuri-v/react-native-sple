// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  // route.params를 통해 전달된 데이터 가져오기
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.skills}>Skills:</Text>
      {item.skills.map((skill, index) => (
        <Text key={index} style={styles.skillItem}>
          - {skill}
        </Text>
      ))}
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    marginVertical: 10,
  },
  skills: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  skillItem: {
    fontSize: 16,
  },
});

export default DetailScreen;
