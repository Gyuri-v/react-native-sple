import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';  // Expo를 사용하는 경우


const SkillList = ({ title, data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.list}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => navigation.navigate('SubjectDetail', { subject: item })}
        >
          <View style={styles.icon}>
            {/* <Text style={styles.icon.text}>{item.icon}</Text> */}
            <Image source={item.image} style={styles.image} />
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    width: '30%',
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
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    text: {
      fontSize: 30,
    },
  },
  image: {
    width: 30,
    height: 30,
  }, 
  text: {
    fontSize: 10,
    color: '#333',
  },
});

export default SkillList;