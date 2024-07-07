import {NativeBaseProvider} from 'native-base';
import {Theme} from "../styles/light";
import Routes from "../Routes";

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <Routes/>
    </NativeBaseProvider>
  );
}