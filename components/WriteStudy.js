// screens/AddCourseScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { useStudyContext } from '../context/StudyContext';

const EMOJIS = ["📚", "💻", "🎯", "🚀", "📱", "⚛️", "🎨", "🔧", "📊", "🤖"];

const AddCourseScreen = ({ navigation }) => {
  const { addStudyItem } = useStudyContext();
  const [courseData, setCourseData] = useState({
    icon: "",
    title: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim()) {
      setCourseData({
        ...courseData,
        skills: [...courseData.skills, skillInput.trim().toLowerCase()]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = courseData.skills.filter((_, i) => i !== index);
    setCourseData({ ...courseData, skills: newSkills });
  };

  const handleSave = () => {
    if (!courseData.icon) {
      Alert.alert('알림', '아이콘을 선택해주세요.');
      return;
    }
    if (!courseData.title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    if (courseData.skills.length === 0) {
      Alert.alert('알림', '최소 하나의 기술을 입력해주세요.');
      return;
    }

    addStudyItem(courseData);
    Alert.alert('성공', '스터디가 추가되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack()
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 이모지 선택 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>아이콘 선택</Text>
        <View style={styles.emojiContainer}>
          {EMOJIS.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.emojiButton,
                courseData.icon === emoji && styles.selectedEmoji,
              ]}
              onPress={() => setCourseData({ ...courseData, icon: emoji })}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 제목 입력 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="스터디 제목"
          value={courseData.title}
          onChangeText={(text) => setCourseData({ ...courseData, title: text })}
        />
      </View>

      {/* 기술 입력 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사용 기술</Text>
        <View style={styles.skillInputContainer}>
          <TextInput
            style={styles.skillInput}
            placeholder="기술 입력 (예: react)"
            value={skillInput}
            onChangeText={setSkillInput}
            onSubmitEditing={addSkill}
          />
          <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
            <Text style={styles.addSkillButtonText}>추가</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {courseData.skills.map((skill, index) => (
            <TouchableOpacity
              key={index}
              style={styles.skillTag}
              onPress={() => removeSkill(index)}
            >
              <Text style={styles.skillTagText}>{skill}</Text>
              <Text style={styles.removeSkill}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>스터디 등록</Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  selectedEmoji: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  emojiText: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  skillInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  skillInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
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
  skillTagText: {
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
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCourseScreen;