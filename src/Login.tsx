import {VStack, Image, Text, Box, FormControl, Input} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {InputField} from "./components/InputField";

export default function Login({navigation}: any) {
  
  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
        <SecondaryButton messageText="" actionText="Voltar" onPress={() => {
          navigation.navigate('Homepage');
        }}/>
      </Box>
      
      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>
  
        <Header>Digite os seus dados</Header>
  
        <Box>
          <InputField placeholder={"Email"} isPassword={false}/>
          <InputField placeholder={"Senha"} isPassword={true}/>
        </Box>
        <DefaultButton onPress={() => {
          navigation.navigate('Homepage'); // TODO: Replace when dashboard is done.
        }}>Logar</DefaultButton>
        <SecondaryButton messageText="Eu ainda não tenho uma conta." actionText="Criar" onPress={() => {
          navigation.navigate('Register');
        }}/>
      </VStack>
      
    </Box>
  );
}