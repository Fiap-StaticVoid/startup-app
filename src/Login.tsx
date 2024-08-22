import {VStack, Image, Box, useToast} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {InputField} from "./components/InputField";
import React, {useEffect} from "react";
import {APIUsuarios} from "./services/api/usuarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}: any) {
  const toast = useToast();
  const userAPI = new APIUsuarios(null);

  useEffect(() => {
    AsyncStorage.removeItem('token');
  }, []);

  const validateEmail = (str: string) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //console.log(`EMAIL: ${str} | ${regex.test(str)}`);
    return regex.test(str);
  };
  
  async function login() {
    if (!validateEmail(email)) {
      toast.show({
        title: "E-mail inválido",
        description: "O e-mail informado não é válido. Por favor, verifique o e-mail e tente novamente.",
        duration: 3000,
        backgroundColor: "red.300",
      });

      throw new Error("E-mail inválido");
    }
    
    const token = await userAPI.login({
      email: email,
      senha: password,
    });
    
    if (token) {
      await AsyncStorage.setItem('token', token);
    } else {
      toast.show({
        title: "Erro ao logar",
        description: "Verifique se o email e a senha estão corretos.",
        duration: 3000,
        backgroundColor: "red.500",
      });
      
      throw new Error("Erro ao logar");
    }
  }
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
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
          <InputField placeholder={"Email"} isPassword={false} onChangeText={email => setEmail(email)}/>
          <InputField placeholder={"Senha"} isPassword={true} onChangeText={pass => setPassword(pass)}/>
        </Box>
        <DefaultButton onPress={() => {
          login().then(() => {            
            navigation.navigate('Dashboard');
          }).catch((error) => {
            toast.show({
              title: "Erro ao logar",
              description: "Verifique se o email e a senha estão corretos.",
              duration: 3000,
              backgroundColor: "red.500",
            });
            console.error(error);
          });
        }}>Logar</DefaultButton>
        <SecondaryButton messageText="Eu ainda não tenho uma conta." actionText="Criar" onPress={() => {
          navigation.navigate('Register');
        }}/>
      </VStack>
      
    </Box>
  );
}