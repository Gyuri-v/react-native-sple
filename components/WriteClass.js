// screens/AddClassScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useClassContext } from '../context/ClassContext';

const ICONS = ['📚', '💻', '🎯', '🚀', '📱', '⚛️', '🎨', '🔧', '📊', '🤖'];

const AddClassScreen = ({ navigation }) => {
  const { addClass } = useClassContext();
  const [classData, setClassData] = useState({
    title: '',
    skills: [],
    icon: '',
    platform: '',
    link: '',
  });
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      if (classData.skills.includes(skillInput.trim().toLowerCase())) {
        Alert.alert('알림', '이미 추가된 기술입니다.');
        return;
      }
      setClassData({
        ...classData,
        skills: [...classData.skills, skillInput.trim().toLowerCase()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setClassData({
      ...classData,
      skills: classData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSave = () => {
    if (!classData.title.trim()) {
      Alert.alert('알림', '강의 제목을 입력해주세요.');
      return;
    }
    if (!classData.icon) {
      Alert.alert('알림', '아이콘을 선택해주세요.');
      return;
    }
    if (classData.skills.length === 0) {
      Alert.alert('알림', '최소 하나의 기술을 입력해주세요.');
      return;
    }

    addClass(classData);
    Alert.alert('성공', '새로운 강의가 추가되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack()
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 강의 제목 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>강의 제목</Text>
        <TextInput
          style={styles.input}
          placeholder="예) 노마드코더) React Basics"
          value={classData.title}
          onChangeText={(text) => setClassData({ ...classData, title: text })}
        />
      </View>

      {/* 플랫폼 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>플랫폼</Text>
        <TextInput
          style={styles.input}
          placeholder="예) 인프런, 노마드코더"
          value={classData.platform}
          onChangeText={(text) => setClassData({ ...classData, platform: text })}
        />
      </View>

      {/* 강의 링크 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>강의 링크</Text>
        <TextInput
          style={styles.input}
          placeholder="강의 URL을 입력하세요"
          value={classData.link}
          onChangeText={(text) => setClassData({ ...classData, link: text })}
        />
      </View>

      {/* 아이콘 선택 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>아이콘 선택</Text>
        <View style={styles.iconGrid}>
          {ICONS.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconButton,
                classData.icon === icon && styles.selectedIcon
              ]}
              onPress={() => setClassData({ ...classData, icon: icon })}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 기술 스택 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기술 스택</Text>
        <View style={styles.skillInputContainer}>
          <TextInput
            style={styles.skillInput}
            placeholder="기술을 입력하세요"
            value={skillInput}
            onChangeText={setSkillInput}
            onSubmitEditing={addSkill}
          />
          <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
            <Text style={styles.addSkillButtonText}>추가</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {classData.skills.map((skill, index) => (
            <TouchableOpacity
              key={index}
              style={styles.skillTag}
              onPress={() => removeSkill(skill)}
            >
              <Text style={styles.skillText}>{skill}</Text>
              <Text style={styles.removeSkill}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>강의 등록</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  selectedIcon: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  iconText: {
    fontSize: 24,
  },
  skillInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  skillInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addSkillButton: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addSkillButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillText: {
    color: '#2196F3',
    marginRight: 4,
  },
  removeSkill: {
    color: '#2196F3',
    fontSize: 18,
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

export default AddClassScreen;