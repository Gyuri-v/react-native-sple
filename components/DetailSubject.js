// screens/SubjectDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSubjectContext } from '../context/SubjectContext';
import ProgressEditModal from './ProgressEditmodal';

const SubjectDetailScreen = ({ route, navigation }) => {
  const { subjects, updateProgress } = useSubjectContext();
  const [isProgressModalVisible, setProgressModalVisible] = useState(false);

  const subject = subjects.find(s => s.name === route.params.subject.name);

  const handleLinkPress = async (url) => {
    if (!url) {
      Alert.alert('알림', '링크가 제공되지 않았습니다.');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('오류', '이 링크를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.');
    }
  };

  const handleProgressUpdate = (newProgress) => {
    updateProgress(subject.name, newProgress);
  };

  if (!subject) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>주제를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {/* 헤더 섹션 */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image source={subject.image} style={styles.icon} />
          </View>
          <Text style={styles.title}>{subject.name}</Text>
          <Text style={styles.subtitle}>{subject.category}</Text>
        </View>

        {/* 소개 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>소개</Text>
          <Text style={styles.description}>
            {subject.description || "설명이 제공되지 않았습니다."}
          </Text>
        </View>

        {/* 학습 자료 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>학습 자료</Text>
          
          {/* 공식 문서 */}
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleLinkPress(subject.resources?.officialDocs)}
          >
            <FontAwesome name="book" size={24} color="#2196F3" />
            <Text style={styles.resourceTitle}>공식 문서</Text>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>

          {/* 추천 강의 */}
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleLinkPress(subject.resources?.recommendedCourse)}
          >
            <FontAwesome name="play-circle" size={24} color="#2196F3" />
            <Text style={styles.resourceTitle}>추천 강의</Text>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>

          {/* 깃허브 저장소 */}
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleLinkPress(subject.resources?.githubRepo)}
          >
            <FontAwesome name="github" size={24} color="#2196F3" />
            <Text style={styles.resourceTitle}>깃허브 저장소</Text>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 관련 프로젝트 섹션 */}
        {subject.projects && subject.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>관련 프로젝트</Text>
            <View style={styles.projectList}>
              {subject.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

          {/* 학습 진행률 섹션 */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>학습 진행률</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setProgressModalVisible(true)}
              >
                <Text style={styles.editButtonText}>수정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${subject.progress || 0}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(subject.progress || 0)}% 완료
            </Text>
          </View>

      </ScrollView>

      <ProgressEditModal
        visible={isProgressModalVisible}
        onClose={() => setProgressModalVisible(false)}
        initialProgress={subject.progress || 0}
        onSave={handleProgressUpdate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  resourceTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  projectList: {
    gap: 10,
  },
  projectItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  editButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default SubjectDetailScreen;