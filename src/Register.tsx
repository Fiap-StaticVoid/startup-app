import {VStack, Image, Text, Box, FormControl, Input, useToast} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {InputField} from "./components/InputField";
import React, {useEffect, useState} from "react";
import {APIUsuarios, Usuario} from "./services/api/usuarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({navigation}: any) {

  const toast = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userAPI = new APIUsuarios(null);
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    AsyncStorage.removeItem('token');
  }, []);

  const validatePassword = (str: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?#&])[A-Za-z\d@$!%#*^?&]{8,}$/;
    //console.log(`PASSWORD: ${str} | ${regex.test(str)}`);
    return regex.test(str);
  };
  
  const validateEmail = (str: string) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //console.log(`EMAIL: ${str} | ${regex.test(str)}`);
    return regex.test(str);
  };
  
  async function register(email: string, password: string) {
    
    if (!validatePassword(password)) {
      toast.show({
        title: "Senha fraca",
        description: "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
        duration: 3000,
        backgroundColor: "red.500",
      });
      
      throw new Error("Senha fraca");
    }
    
    if (!validateEmail(email)) {
      toast.show({
        title: "E-mail inválido",
        description: "O e-mail informado não é válido. Por favor, verifique o e-mail e tente novamente.",
        duration: 3000,
        backgroundColor: "red.500",
      });
      
      throw new Error("E-mail inválido");
    }
    
    const newUser = await userAPI.create({
      nome: "",
      email: email,
      senha: password,
    });
    
    const token = await userAPI.login({
      email: email,
      senha: password,
    });

    if (token) {
      await AsyncStorage.setItem('token', token);
    } else {
      toast.show({
        title: "Erro ao carregar dashboard",
        description: "Tente novamente mais tarde.",
        duration: 3000,
        backgroundColor: "red.500",
      });

      throw new Error("Erro ao carregar dashboard");
    }
    
    setUser(newUser);
  }
  
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
          register(email, password).then(() => {
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