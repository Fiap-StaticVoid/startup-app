﻿import {VStack, Image, Text, Box} from "native-base";
import PiggyBank from './assets/Piggybank.png';
import Logo from './assets/LOGO_White.png';
import {useWindowDimensions} from "react-native";
import {DefaultButton} from "./components/DefaultButton";
import {SecondaryButton} from "./components/SecondaryButton";

export default function Homepage() {

  const {width, height} = useWindowDimensions();
  const sphereSize = Math.min(width, height);

  return (
    <Box flex={1}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom="40%"
        bg="pink.300"
        zIndex={-2}
      />

      <Box
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: [{translateX: -sphereSize / 2}, {translateY: -sphereSize / 2}],
          width: sphereSize,
          height: sphereSize,
          borderRadius: sphereSize / 2,
          backgroundColor: 'white',
          zIndex: -1,
        }}
      />
      
    <VStack flex={1} alignItems="center" p={12} justifyContent="center">
      <Image source={Logo} alt={"Logo PiggyGuard"}/>
      <Image source={PiggyBank} alt={"Piggybank"} marginTop={10}/>

      <Text fontSize={16} color="black.300" textAlign="center" marginTop={10} lineHeight={20}>Gerencie suas finanças de forma simples e
        eficiente. Acompanhe seus gastos, identifique padrões e tome o controle de sua vida financeira.</Text>
      
      <DefaultButton>Criar uma conta</DefaultButton>
      <SecondaryButton messageText="Eu já tenho uma conta." actionText="Logar"/>
    </VStack>
    </Box>
  );
}