import {VStack, Image, Text, Box, FormControl, Input} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {InputField} from "./components/InputField";

export default function Login() {
  
  return (
    <Box flex={1}>
      <Box position="absolute" top="65px" left={-65}>
        <SecondaryButton messageText="" actionText="Voltar" />
      </Box>
      
      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>
  
        <Header>Digite os seus dados</Header>
  
        <Box>
          <InputField placeholder={"Email"} isPassword={false}/>
          <InputField placeholder={"Senha"} isPassword={true}/>
        </Box>
        <DefaultButton>Logar</DefaultButton>
        <SecondaryButton messageText="Eu ainda não tenho uma conta." actionText="Criar"/>
      </VStack>
      
    </Box>
  );
}