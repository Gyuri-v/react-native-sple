import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 사용\
import { useNavigation } from '@react-navigation/native';



const List = ({ data }) => {
  const navigation = useNavigation();

  const navigateToDetail = (item) => {
    // navigation.navigate('Detail', { item });
    navigation.navigate('StudyDetail', { item });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => navigateToDetail(item)}>
      <View style={styles.icon}>
        <Text style={styles.icon.text}>{item.icon}</Text>
      </View>
      <View style={styles.itemDetails}>
        {item.category ? ( <Text style={styles.category}>{item.category}</Text> ) : null}
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.skillsContainer}>
          {item.skills.map((skill, index) => (
            <Text key={index} style={styles.skillText}>{skill} </Text>
            // <Text key={index}>{skill} </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{title}</Text> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
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
  itemDetails: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  skillIcon: {
    marginRight: 5,
  },
});

export default List;
