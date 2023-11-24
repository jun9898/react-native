import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput
} from 'react-native';
import {theme} from "./color";
import {useEffect, useState} from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  useEffect(() => {
    working
  }, [console.log(working)]);

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
/*
            안된당
            returnKeyType="send"
*/
            value={text}
            onChangeText={onChangeText}
            multiline
            placeholder={working ? "Add a To Do" : "Where do you want to go?"}
            style={styles.input}>
        </TextInput>
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
  }

});
