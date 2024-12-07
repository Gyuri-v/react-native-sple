// screens/ClassDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ClassDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleLinkPress = async () => {
    // 예시 링크
    const url = "https://example.com/course";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('오류', '강의 링크를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.');
    }
  };

  const addNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: note,
        timestamp: new Date().toLocaleDateString()
      };
      setNotes([newNote, ...notes]);
      setNote('');
      setShowNoteInput(false);
    }
  };

  const deleteNote = (noteId) => {
    Alert.alert(
      '노트 삭제',
      '이 노트를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '삭제', 
          onPress: () => setNotes(notes.filter(n => n.id !== noteId)),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 섹션 */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.skillsContainer}>
          {item.skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 수강 진행률 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>수강 진행률</Text>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressButtons}>
          {[0, 25, 50, 75, 100].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.progressButton,
                progress === value && styles.progressButtonActive
              ]}
              onPress={() => setProgress(value)}
            >
              <Text style={[
                styles.progressButtonText,
                progress === value && styles.progressButtonTextActive
              ]}>
                {value}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 강의 링크 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>강의 링크</Text>
        <TouchableOpacity style={styles.linkButton} onPress={handleLinkPress}>
          <FontAwesome name="play-circle" size={20} color="#2196F3" />
          <Text style={styles.linkText}>강의 페이지로 이동</Text>
        </TouchableOpacity>
      </View>

      {/* 수강 노트 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>수강 노트</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowNoteInput(true)}
          >
            <Text style={styles.addButtonText}>+ 노트 추가</Text>
          </TouchableOpacity>
        </View>

        {showNoteInput && (
          <View style={styles.noteInputContainer}>
            <TextInput
              style={styles.noteInput}
              multiline
              placeholder="노트를 입력하세요"
              value={note}
              onChangeText={setNote}
            />
            <View style={styles.noteButtons}>
              <TouchableOpacity 
                style={[styles.noteButton, styles.cancelButton]}
                onPress={() => {
                  setShowNoteInput(false);
                  setNote('');
                }}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.noteButton, styles.saveButton]}
                onPress={addNote}
              >
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {notes.length > 0 ? (
          notes.map((note) => (
            <View key={note.id} style={styles.noteItem}>
              <View style={styles.noteHeader}>
                <Text style={styles.noteDate}>{note.timestamp}</Text>
                <TouchableOpacity 
                  onPress={() => deleteNote(note.id)}
                  style={styles.deleteButton}
                >
                  <FontAwesome name="trash" size={16} color="#FF5252" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText}>{note.text}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyNotes}>
            <Text style={styles.emptyText}>작성된 노트가 없습니다</Text>
          </View>
        )}
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
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillText: {
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
    color: '#333',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  progressButtonActive: {
    backgroundColor: '#2196F3',
  },
  progressButtonText: {
    color: '#666',
  },
  progressButtonTextActive: {
    color: '#fff',
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
  noteInputContainer: {
    marginBottom: 15,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  noteButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  noteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: '#666',
  },
  saveButtonText: {
    color: '#fff',
  },
  noteItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteDate: {
    color: '#666',
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyNotes: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default ClassDetailScreen;