import {VStack, Image, Text, Box, ScrollView} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IconButton} from "./components/IconButton";
import {TransactionRecord} from "./components/TransactionRecord";
import {StraightLine} from "./components/StraightLine";

export default function Dashboard({navigation}: any) {

  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
        <SecondaryButton messageText="" actionText="Editar" onPress={() => {
          //
        }}/>
      </Box>
      
      <Box position="absolute" top="65px" right={15}>
        <IconButton iconName="add" onPress={ () => {
          //
        }}/>
      </Box>

      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>

        <Header mb={0}>Saldo atual</Header>
        <Balance>R$ 259.38</Balance>
        <Header mb={2} mt={3}>Extrato</Header>
        <ScrollView>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={false} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
          <StraightLine/>
          <TransactionRecord isPositive={true} description={"Burger King"} amount={"36.00"} />
        </ScrollView>
      </VStack>

    </Box>
  );
}