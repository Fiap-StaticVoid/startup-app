import {NativeBaseProvider, StatusBar} from 'native-base';
import {Theme} from "../styles/light";
import Homepage from "../Homepage";
import Login from "../Login";

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <Homepage/>
    </NativeBaseProvider>
  );
}