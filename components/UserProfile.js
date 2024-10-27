import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";


const UserProfile = ({ name }) => {
  return (
    <View style={styles.user}>
      <View style={styles.user.image}>
        <Text style={styles.user.image.text}>👩🏻‍💻</Text>
      </View>
      <View style={styles.user.info}>
        <Text style={styles.user.info.name}>박규리</Text>
        <Text style={styles.user.info.text}>오늘도 화이팅 👏🏻</Text>
      </View>
    </View>
  );
};
// const UserProfile = ({ name, imageUrl }) => {
//   return (
//     <View style={styles.container}>
//       <Text >{name}</Text>
//     </View>
//   );
// };


/* 스타일 */
const styles = StyleSheet.create({
  /* user */
  user: {
    flexDirection: 'row',
    alignItems: 'center',

    image: {
      alignItems: "center",
      justifyContent: 'center',
      marginRight: '5%',
      width: 50,
      height: 50,
      backgroundColor: '#ddd',
      borderRadius: '50%',
      text: {
        fontSize: 30,
      },
    },
    info: {
      width: '75%',
      name: {
        fontSize: 20,
        fontWeight: 600,
      },
      text: {
        fontSize: 14,
        fontWeight: 400,
      }
    },
  },
});

export default UserProfile;