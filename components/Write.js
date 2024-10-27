// screens/AddCourseScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const EMOJIS = ["📚", "💻", "🎯", "🚀", "📱", "⚛️", "🎨", "🔧", "📊", "🤖"];

const AddCourseScreen = ({ navigation }) => {
  const [courseData, setCourseData] = useState({
    icon: "",
    title: "",
    link: "",
    startDate: new Date(),
    techImages: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    if (courseData.techImages.length >= 5) {
      alert('최대 5개의 이미지만 등록 가능합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCourseData({
        ...courseData,
        techImages: [...courseData.techImages, result.assets[0].uri],
      });
    }
  };

  const removeImage = (index) => {
    const newImages = courseData.techImages.filter((_, i) => i !== index);
    setCourseData({ ...courseData, techImages: newImages });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 이모지 선택 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>강의 아이콘 선택</Text>
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

      {/* 강의 정보 입력 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>강의 정보</Text>
        <TextInput
          style={styles.input}
          placeholder="강의 제목"
          value={courseData.title}
          onChangeText={(text) => setCourseData({ ...courseData, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="강의 링크"
          value={courseData.link}
          onChangeText={(text) => setCourseData({ ...courseData, link: text })}
        />
        
        {/* 날짜 선택 */}
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>시작일: {courseData.startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={courseData.startDate}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setCourseData({ ...courseData, startDate: selectedDate });
              }
            }}
          />
        )}
      </View>

      {/* 기술 이미지 업로드 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사용 기술 이미지 (최대 5개)</Text>
        <View style={styles.imageContainer}>
          {courseData.techImages.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.techImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <AntDesign name="closecircle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          {courseData.techImages.length < 5 && (
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <AntDesign name="plus" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={() => {
        // TODO: Save course data
        navigation.goBack();
      }}>
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
    marginBottom: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  techImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
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