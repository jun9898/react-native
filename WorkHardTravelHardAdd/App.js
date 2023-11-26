import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import {theme} from "./color";
import {useEffect, useState} from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text === "") {
      return
    }
/*
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, work: working}});
    Object.assign 말고 다른 방법이 있단다
    뭔가 했더니 스프레드 연산자였다
*/
    const newToDos = {
      ...toDos,
      [Date.now()]: {text, work: working}
    }

    setToDos(newToDos);
    setText("");
    console.log(newToDos);
  }


  useEffect(() => {
    working
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* 헤더 영역 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white": theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
            onSubmitEditing={addToDo}
            value={text}
            onChangeText={onChangeText}
            placeholder={working ? "Add a To Do" : "Where do you want to go?"}
            style={styles.input}>
        </TextInput>
      <ScrollView>
        {Object.keys(toDos).map(key =>
        <View style={styles.toDo} key={key}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
        </View>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    fontSize: 18,
  },
  toDo: {

  },
  toDoText: {
    color: "white"
  },
});
