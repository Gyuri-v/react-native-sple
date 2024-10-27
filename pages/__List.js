// screens/CourseListScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CourseListScreen = ({ navigation }) => {
  // 샘플 데이터
  const courses = [
    {
      id: '1',
      icon: '📚',
      title: 'React Native 마스터 과정',
      progress: 75,
      techImages: [
        'https://example.com/react.png',
        'https://example.com/javascript.png',
      ],
    },
    // ... 더 많은 강의 데이터
  ];

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
    >
      <View style={styles.courseHeader}>
        <Text style={styles.courseIcon}>{item.icon}</Text>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.techImages}>
        {item.techImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.techImage} />
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCourse')}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  courseItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginRight: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  techImages: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  techImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CourseListScreen;