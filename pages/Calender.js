import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useCalendarContext } from '../context/CalendarContext';
import PageTitle from '../components/PageTitle';

// import { styles } from "./_style";

/* 캘린더 */
export function CalenderScreen() {
  const { studyDays, addStudyGoal, toggleStudyCompletion, removeStudyGoal } = useCalendarContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newStudy, setNewStudy] = useState({ subject: '', icon: '' });

  // 캘린더 마커 데이터 생성
  const markedDates = Object.entries(studyDays).reduce((acc, [date, data]) => {
    acc[date] = {
      marked: true,
      dots: data.studies.map(study => ({
        color: study.completed ? '#2196F3' : '#999',
        key: study.id.toString()
      }))
    };
    if (date === selectedDate) {
      acc[date].selected = true;
    }
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAddStudy = () => {
    if (newStudy.subject && newStudy.icon) {
      addStudyGoal(selectedDate, {
        ...newStudy,
        completed: false
      });
      setNewStudy({ subject: '', icon: '' });
      setShowModal(false);
    }
  };

  const renderStudyItem = ({ item }) => (
    <View style={[styles.studyItem, !item.completed && styles.studyItemGray]}>
      <Text style={styles.studyIcon}>{item.icon}</Text>
      <Text style={styles.studySubject}>{item.subject}</Text>
      <View style={styles.studyActions}>
        <TouchableOpacity
          onPress={() => toggleStudyCompletion(selectedDate, item.id)}
          style={[styles.actionButton, item.completed && styles.completedButton]}
        >
          <Text style={styles.actionButtonText}>
            {item.completed ? '완료' : '시작'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeStudyGoal(selectedDate, item.id)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.actionButtonText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PageTitle icon="📅" title="포토 캘린더" />
      
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          selectedDayBackgroundColor: '#2196F3',
          selectedDayTextColor: '#ffffff',
          dotColor: '#2196F3',
          todayTextColor: '#2196F3',
        }}
        markingType={'multi-dot'}
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />

      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateTitle}>{selectedDate}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.addButtonText}>+ 공부 추가</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={studyDays[selectedDate]?.studies || []}
            renderItem={renderStudyItem}
            keyExtractor={item => item.id.toString()}
            style={styles.studyList}
          />
        </View>
      )}

<Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>공부 목표 추가</Text>
            
            <TextInput
              style={styles.input}
              placeholder="과목명"
              value={newStudy.subject}
              onChangeText={text => setNewStudy(prev => ({ ...prev, subject: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="이모지"
              value={newStudy.icon}
              onChangeText={text => setNewStudy(prev => ({ ...prev, icon: text }))}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddStudy}
              >
                <Text style={styles.confirmButtonText}>추가</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendar: {
    marginBottom: 10,
  },
  selectedDateContainer: {
    flex: 1,
    padding: 16,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  studyList: {
    flex: 1,
  },
  studyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  studyItemGray: {
    opacity: 0.6,
  },
  studyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  studySubject: {
    flex: 1,
    fontSize: 16,
  },
  studyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: '#666',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});