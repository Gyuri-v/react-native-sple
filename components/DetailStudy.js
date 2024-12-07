// screens/StudyDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StudyDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLinkPress = async () => {
    if (!item.link) {
      Alert.alert('알림', '링크가 제공되지 않았습니다.');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(item.link);
      if (supported) {
        await Linking.openURL(item.link);
      } else {
        Alert.alert('오류', '이 링크를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 섹션 */}
      <View style={styles.header}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>

      {/* 기술 스택 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사용 기술</Text>
        <View style={styles.skillsContainer}>
          {item.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 상태 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>진행 상태</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isCompleted ? styles.completedButton : styles.inProgressButton
          ]}
          onPress={() => setIsCompleted(!isCompleted)}
        >
          <FontAwesome 
            name={isCompleted ? "check-circle" : "clock-o"} 
            size={20} 
            color={isCompleted ? "#fff" : "#fff"} 
          />
          <Text style={styles.statusText}>
            {isCompleted ? "완료됨" : "진행중"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 링크 섹션 */}
      {item.link && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>학습 링크</Text>
          <TouchableOpacity style={styles.linkButton} onPress={handleLinkPress}>
            <FontAwesome name="external-link" size={20} color="#2196F3" />
            <Text style={styles.linkText}>학습 페이지로 이동</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 메모 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>메모</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => Alert.alert('알림', '메모 기능은 준비중입니다.')}
          >
            <Text style={styles.addButtonText}>+ 메모 추가</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.memoPlaceholder}>
          <Text style={styles.placeholderText}>아직 작성된 메모가 없습니다.</Text>
        </View>
      </View>
    </ScrollView>
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
  icon: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryContainer: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  category: {
    color: '#2196F3',
    fontSize: 14,
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
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillText: {
    color: '#666',
    fontSize: 14,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  inProgressButton: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    gap: 10,
  },
  linkText: {
    color: '#2196F3',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  memoPlaceholder: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
});

export default StudyDetailScreen;