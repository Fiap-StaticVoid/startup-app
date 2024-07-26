﻿import {VStack, Image, Box, ScrollView, Text} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IconButton} from "./components/IconButton";
import {TransactionCard} from "./components/TransactionCard";
import React, {useRef} from "react";
import ActionSheetBase, {ActionSheetRef} from "./components/ActionSheetBase";
import {ToggleButtons} from "./components/ToggleButtons";
import {AutoSizingInputField} from "./components/AutoSizingInputField";
import {ActionSheetField} from "./components/ActionSheetField";
import {SimpleInputField} from "./components/SimpleInputField";
import {ActionButton} from "./components/ActionButton";

export default function Dashboard({navigation}: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.open();
    }
  };
  
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const sections = [
    {
      id: 1,
      title: "Lançamento",
      inputFields: [
        {
          id: 1,
          label: "Nome",
          placeholder: "Nome",
          type: "text",
        },
        {
          id: 2,
          label: "Recorrência",
          placeholder: "",
          type: "action",
        },
        {
          id: 3,
          label: "Tag",
          placeholder: "",
          type: "action",
        }
      ]
    },
    {
      id: 2,
      title: "Recorrência",
      inputFields: [
        {
          id: 1,
          label: "Nunca",
          placeholder: "",
          type: "radio",
        },
        {
          id: 2,
          label: "Diariamente",
          placeholder: "",
          type: "radio",
        },
        {
          id: 3,
          label: "Semanalmente",
          placeholder: "",
          type: "radio",
        },
        {
          id: 4,
          label: "Mensalmente",
          placeholder: "",
          type: "radio",
        },
        {
          id: 5,
          label: "Anualmente",
          placeholder: "",
          type: "radio",
        },
      ]
    }
  ]

  function Something() {

  }
  
  const [isPositive, setIsPositive] = React.useState(true);
  const [value, setValue] = React.useState('');
  const [balance, setBalance] = React.useState(249.38);

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
        <Balance>R$ {balance}</Balance>
        <Header mb={2} mt={3}>Extrato</Header>
        
        <ActionSheetBase ref={actionSheetRef} title={"Lançamento"}>
          <Box>
            {
              sectionIndex === 0 &&
              <Box>
                <ToggleButtons onSelect={(pos) => setIsPositive(pos)}/>
                <Box flexDirection="row" justifyContent='center' alignItems ='center' px={10} pt={5}>
                  <Balance fontSize={40} mr={0}>R$ </Balance>
                  <AutoSizingInputField placeholder={"0,00"} keyboardType={'numeric'} ></AutoSizingInputField>
                  {/*<SimpleInputField textAlign="left" fontSize={40} maxLength={8} fontFamily={"record"} color={"accent.300"} h={16} placeholder={"100,00"} ></SimpleInputField>*/}
                </Box>
              </Box>
            }
            <Box w="100%" borderColor="accent.300" borderWidth={1.5} borderRadius={15} py={1.5} m={5} mb={-3}>
              {
                sections[sectionIndex].inputFields.map((field, index) => {
                  const isLastField = index === sections[sectionIndex].inputFields.length - 1;
                  
                  return (
                    <Box>
                    <ActionSheetField title={field.label} key={`title_${field.id}`}>
                      {
                        field.type === "action" &&
                        <ActionButton title={"" /* Opção escolhida */} onPress={Something} key={`input_${field.id}`}></ActionButton>
                      }
                      {
                        field.type === "text" &&
                        <SimpleInputField placeholder={field.placeholder} key={`input_${field.id}`}/>
                      }
                    </ActionSheetField>
                      {
                        !isLastField &&
                        <Text textAlign={"center"} mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"} key={`line_${field.id}`}>____________________________________________________________________</Text> 
                      }
                    </Box>
                  )
                })
              }
              
{/*              <ActionSheetField title={"Nome"}>
                <SimpleInputField placeholder="Nome"/>
              </ActionSheetField>*/}

              {/* Suddenly StraightLine stopped rendering for some reason */}
              {/*<StraightLine h={0.5} w="100%"/>*/}
{/*              <Text textAlign={"center"} mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"}>____________________________________________________________________</Text>

              <ActionSheetField title={"Recorrência"}>
                <ActionButton title={"" /* Opção escolhida *!/ onPress={Something}></ActionButton>
              </ActionSheetField>

              <Text textAlign={"center"}  mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"}>____________________________________________________________________</Text>

              <ActionSheetField title={"Tag"}>
                <ActionButton title={"" /* Opção escolhida *!/ onPress={Something}></ActionButton>
              </ActionSheetField>*/}
            </Box>

          </Box>       
        </ActionSheetBase>
        
        <ScrollView>
          <TransactionCard isPositive={true} description="Burger King" amount="36.00" tag={"salário"}/>
          <TransactionCard isPositive={false} description="Burger King" amount="30.00"/>
        </ScrollView>
      </VStack>

    </Box>
  );
}