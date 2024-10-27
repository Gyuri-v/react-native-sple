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

import { styles } from "./_style";
import PageTitle from "../components/PageTitle";

const STORAGE_KEY = "@toDos";

/* 투두리스트 */
export function TasksScreen() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  /* useEffect */
  useEffect(() => {
    loadToDos();
  }, []);

  /* category */
  const onChangeText = (payload) => setText(payload);

  /* func */
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>

      {/* contents */}
      <ScrollView>
        <PageTitle icon="📝" title="Tasks" />

        {/* todo */}
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={
            working ? "What do you have to do?" : "Where do you want to go?"
          }
          style={taskStyles.input}
        />
        <View>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={taskStyles.toDo} key={key}>
                <Text style={taskStyles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={'gray'} />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export const taskStyles = StyleSheet.create({
  /* todo */
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
    borderWidth: 1,
  },
  toDo: {
    backgroundColor: '#222',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
