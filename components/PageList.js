import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';  // Expo를 사용하는 경우

const PageList = () => {
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Class', router: 'ClassScreen', icon: '👩🏻‍🏫' },
    { name: 'Subject', router: 'SubjectScreen', icon: '📘' },
    { name: 'Study', router: 'StudyScreen', icon: '📚' },
    { name: 'Tasks', router: 'TasksScreen', icon: '📝' },
    { name: 'Calendar', router: 'CalenderScreen', icon: '📅' },
  ];

  return (
    <View style={styles.list}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => navigation.navigate(item.name)}
        >
          <View style={styles.icon}>
            <Text style={styles.icon.text}>{item.icon}</Text>
          </View>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

/* 스타일 */
const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    width: 48,
    height: 48,
    backgroundColor: '#ddd',
    borderRadius: '50%',
    text: {
      fontSize: 30,
    },
  },
  text: {
    fontSize: 10,
    color: '#333',
  },
});

export default PageList;