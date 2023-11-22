import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';

export default function App() {
  return (
      <View style={{ flex: 1, flexDirection: "row"}}>
        <View style={{ flex: 1, flexDirection: "row"}}>
          {/* 재 밌 다 */}
          {/* flex는 화면을 비율로 나눌 수 있음 */}
          <View style={{flex: 1, backgroundColor:"tomato"}}></View>
          <View style={{flex: 1, backgroundColor:"teal"}}></View>
          <View style={{flex: 1, backgroundColor:"orange"}}></View>
        </View>
        <View style={{ flex: 1, flexDirection: "row"}}>
          <View style={{flex: 1, backgroundColor:"tomato"}}></View>
          <View style={{flex: 1, backgroundColor:"teal"}}></View>
          <View style={{flex: 1, backgroundColor:"orange"}}></View>
        </View>
      </View>
  );
}

