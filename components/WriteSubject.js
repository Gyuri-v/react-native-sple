// screens/AddSubjectScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useSubjectContext } from '../context/SubjectContext';

const AddSubjectScreen = ({ navigation }) => {
  const { addSubject } = useSubjectContext();
  const [subjectData, setSubjectData] = useState({
    name: '',
    image: null,
    description: '',
    category: '',
    resources: {
      officialDocs: '',
      recommendedCourse: '',
      githubRepo: ''
    },
    projects: [
      { title: '', description: '' }
    ]
  });

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한이 필요합니다', '이미지를 선택하기 위해 갤러리 접근 권한이 필요합니다.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSubjectData({
          ...subjectData,
          image: { uri: result.assets[0].uri }
        });
      }
    } catch (error) {
      Alert.alert('오류', '이미지를 선택하는 중 문제가 발생했습니다.');
    }
  };

  const addProject = () => {
    setSubjectData({
      ...subjectData,
      projects: [...subjectData.projects, { title: '', description: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...subjectData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setSubjectData({ ...subjectData, projects: newProjects });
  };

  const removeProject = (index) => {
    const newProjects = subjectData.projects.filter((_, i) => i !== index);
    setSubjectData({ ...subjectData, projects: newProjects });
  };

  const handleSave = () => {
    // 기본 검증
    if (!subjectData.name.trim()) {
      Alert.alert('알림', '주제 이름을 입력해주세요.');
      return;
    }
    if (!subjectData.image) {
      Alert.alert('알림', '이미지를 선택해주세요.');
      return;
    }
    if (!subjectData.description.trim()) {
      Alert.alert('알림', '소개를 입력해주세요.');
      return;
    }

    // 새로운 주제 추가
    addSubject({
      ...subjectData,
      router: 'SubjectDetail'
    });

    Alert.alert('성공', '새로운 주제가 추가되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack()
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 기본 정보 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기본 정보</Text>
        
        <Text style={styles.label}>주제 이름</Text>
        <TextInput
          style={styles.input}
          placeholder="주제 이름을 입력하세요"
          value={subjectData.name}
          onChangeText={(text) => setSubjectData({ ...subjectData, name: text })}
        />

        <Text style={styles.label}>카테고리</Text>
        <TextInput
          style={styles.input}
          placeholder="카테고리를 입력하세요 (예: 프로그래밍 언어, 프레임워크)"
          value={subjectData.category}
          onChangeText={(text) => setSubjectData({ ...subjectData, category: text })}
        />
      </View>

      {/* 이미지 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>주제 이미지</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {subjectData.image ? (
            <Image
              source={subjectData.image}
              style={styles.selectedImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome name="image" size={40} color="#999" />
              <Text style={styles.placeholderText}>이미지 선택</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 소개 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>소개</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="주제에 대한 상세 설명을 입력하세요"
          multiline
          numberOfLines={4}
          value={subjectData.description}
          onChangeText={(text) => setSubjectData({ ...subjectData, description: text })}
        />
      </View>

      {/* 학습 자료 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>학습 자료</Text>
        
        <Text style={styles.label}>공식 문서 링크</Text>
        <TextInput
          style={styles.input}
          placeholder="공식 문서 URL을 입력하세요"
          value={subjectData.resources.officialDocs}
          onChangeText={(text) => setSubjectData({
            ...subjectData,
            resources: { ...subjectData.resources, officialDocs: text }
          })}
        />

        <Text style={styles.label}>추천 강의 링크</Text>
        <TextInput
          style={styles.input}
          placeholder="추천 강의 URL을 입력하세요"
          value={subjectData.resources.recommendedCourse}
          onChangeText={(text) => setSubjectData({
            ...subjectData,
            resources: { ...subjectData.resources, recommendedCourse: text }
          })}
        />

        <Text style={styles.label}>깃허브 저장소</Text>
        <TextInput
          style={styles.input}
          placeholder="GitHub 저장소 URL을 입력하세요"
          value={subjectData.resources.githubRepo}
          onChangeText={(text) => setSubjectData({
            ...subjectData,
            resources: { ...subjectData.resources, githubRepo: text }
          })}
        />
      </View>

      {/* 관련 프로젝트 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>관련 프로젝트</Text>
          <TouchableOpacity style={styles.addButton} onPress={addProject}>
            <Text style={styles.addButtonText}>+ 프로젝트 추가</Text>
          </TouchableOpacity>
        </View>

        {subjectData.projects.map((project, index) => (
          <View key={index} style={styles.projectCard}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeProject(index)}
            >
              <FontAwesome name="times" size={20} color="#999" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="프로젝트 제목"
              value={project.title}
              onChangeText={(text) => updateProject(index, 'title', text)}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="프로젝트 설명"
              multiline
              numberOfLines={3}
              value={project.description}
              onChangeText={(text) => updateProject(index, 'description', text)}
            />
          </View>
        ))}
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>주제 등록</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 24,
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
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
  },
  projectCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSubjectScreen;