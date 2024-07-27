import {VStack, Image, Text, Box, FormControl, Input} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {InputField} from "./components/InputField";
import React, {useState} from "react";
import {APIUsuarios, Usuario} from "./services/api/usuarios";

export default function Register({navigation}: any) {

  const userAPI = new APIUsuarios(null);
  
  const [user, setUser] = useState<Usuario | null>(null);
  
  async function register() {
    const newUser = await userAPI.create({
      nome: "",
      email: email,
      senha: password,
    });
    setUser(newUser);
  }
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
        <SecondaryButton messageText="" actionText="Voltar" onPress={() => {
          navigation.navigate('Homepage');
        }} />
      </Box>

      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>

        <Header>Digite os seus dados</Header>

        <Box>
          <InputField placeholder={"Email"} isPassword={false} onChangeText={email => setEmail(email)}/>
          <InputField placeholder={"Senha"} isPassword={true} onChangeText={pass => setPassword(pass)}/>
        </Box>
        <DefaultButton onPress={() => {
          register().then(() => {
            navigation.navigate('Dashboard');
          }).catch((error) => {console.error(error);});
        }}>Criar conta</DefaultButton>
        <SecondaryButton messageText="Eu já tenho uma conta." actionText="Logar" onPress={() => {
          navigation.navigate('Login');
        }}/>
      </VStack>

    </Box>
  );
}