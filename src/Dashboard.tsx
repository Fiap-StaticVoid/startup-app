import {VStack, Image, Box, ScrollView} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IconButton} from "./components/IconButton";
import {TransactionCard} from "./components/TransactionCard";
import React, {useRef} from "react";
import {ActionSheetLancamento} from "./components/ActionSheetLancamento";
import ActionSheetBase, {ActionSheetRef} from "./components/ActionSheetBase";

export default function Dashboard({navigation}: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.open();
    }
  };
  
  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
        <SecondaryButton messageText="" actionText="Editar" onPress={() => {
          // TODO: Enable transactions to be trashable
        }}/>
      </Box>
      
      <Box position="absolute" top="65px" right={15}>
        <IconButton iconName="add" onPress={ () => {
          openActionSheet();
        }}/>
      </Box>

      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>

        <Header mb={0}>Saldo atual</Header>
        <Balance>R$ 259.38</Balance>
        <Header mb={2} mt={3}>Extrato</Header>
        
        <ActionSheetBase ref={actionSheetRef} title={"Lançamento"}>
          <ActionSheetLancamento/>          
        </ActionSheetBase>
        
        <ScrollView>
          <TransactionCard isPositive={true} description="Burger King" amount="36.00" tag={"salário"}/>
          <TransactionCard isPositive={false} description="Burger King" amount="30.00"/>
        </ScrollView>
      </VStack>

    </Box>
  );
}