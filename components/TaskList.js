import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Expo를 사용하는 경우

const TaskList = ({ tasks }) => {
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      {/* 왼쪽 아이콘 */}
      <View style={styles.icon}>
        {/* <FontAwesome name={item.icon} size={20} color="#666" /> */}
        <Text style={styles.icon.text}>{item.icon}</Text>
      </View>
      
      {/* 중앙 컨텐츠 */}
      <View style={styles.contentContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${item.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>

      {/* 오른쪽 상태 */}
      <View style={styles.statusContainer}>
        <FontAwesome 
          name={item.isCompleted ? "check-circle" : "circle-o"} 
          size={20} 
          color={item.isCompleted ? "#4CAF50" : "#999"} 
        />
        <Text style={styles.dateText}>{item.completionDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 리스트 아이템들 */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
  },
  headerContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  // iconContainer: {
  //   width: 40,
  //   alignItems: 'center',
  // },
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
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default TaskList;