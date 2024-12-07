import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PageTitle = ({ icon, title }) => {
  const navigation = useNavigation();

  const goToWritePage = () => {
    if ( title === 'Subject' ) {
      navigation.navigate('WriteSubject');
    } else if ( title === 'Study' ) {
      navigation.navigate('WriteStudy');
    } else if ( title === 'Class' ) {
      navigation.navigate('WriteClass');
    }
  };

  return (
    <View style={styles.heading}>
      <View style={styles.icon}>
        <Text style={styles.icon.text}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>

      {
        (title === 'Subject' || title === 'Study' || title === 'Class') &&  (
          <TouchableOpacity onPress={goToWritePage} style={styles.button}>
            <Text style={styles.button.text}>+</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    text: {
      fontSize: 30,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginLeft: 'auto',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    text: {
      color: '#fff',
      fontSize: 24,
      lineHeight: 23,
    },
  },
});

export default PageTitle;
