import {VStack, Image, Box, ScrollView, Text, useToast} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IconButton} from "./components/IconButton";
import {TransactionCard} from "./components/TransactionCard";
import React, {useEffect, useMemo, useRef} from "react";
import ActionSheetBase, {ActionSheetRef} from "./components/ActionSheetBase";
import {ToggleButtons} from "./components/ToggleButtons";
import {AutoSizingInputField} from "./components/AutoSizingInputField";
import {ActionSheetField} from "./components/ActionSheetField";
import {SimpleInputField} from "./components/SimpleInputField";
import {ActionButton} from "./components/ActionButton";
import {APIHistorico, Historico} from "./services/api/historico";
import {APIUsuarios} from "./services/api/usuarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard({navigation}: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.open();
    }
  };
  
  const toast = useToast();
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
  
  let [historyAPI, setHistoryAPI] = React.useState(new APIHistorico(null));
  
  const [isPositive, setIsPositive] = React.useState(true);
  const [category, setCategory] = React.useState('');
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  
  const [transactions, setTransactions] = React.useState<Historico[]>([]);
  
  const [balance, setBalance] = React.useState((0).toFixed(2));
  
  useEffect(() => {
    async function retrieveHistory() {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Homepage');
        toast.show({
          title: "Erro ao carregar dashboard",
          description: "Por favor, tente novamente mais tarde.",
          duration: 3000,
          backgroundColor: "red.500",
        })

        return null;
      }
      
      setHistoryAPI(new APIHistorico(token));
      
      console.log(await historyAPI.read());
      
      setTransactions(await historyAPI.read().then((b) => {
        let a = b.reduce((acc, transaction) => acc + transaction.valor, 0);
        setBalance(a.toFixed(2));
        return b;
      }));
      
    }

    retrieveHistory();
  }, []);


  async function createRecord(historico: Historico) {
    historico.categoria_id = null;
    historico.data = new Date().toISOString().slice(0, -2);
    
    console.log("historico: ", historico);
    
    setBalance((total) => (parseFloat(total) + historico.valor).toFixed(2));
    setTransactions([...transactions, historico]);
    
    historyAPI.create(historico).then().catch((e) => console.error(e));
    
    console.log("Token: ", historyAPI.token);
  }

  async function deleteRecord(id: string) {
    setTransactions(transactions.filter((r) => r.id !== id));
  }
  
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
          setIsPositive(true);
          setCategory('');
          setValue('');
          setName('');
        }}/>
      </Box>

      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>

        <Header mb={0}>Saldo atual</Header>
        <Balance>{parseInt(balance) < 0 ? "-" : ""}R$ {Math.abs(parseInt(balance)).toFixed(2)}</Balance>
        <Header mb={2} mt={3}>Extrato</Header>
        
        <ActionSheetBase ref={actionSheetRef} title={"Lançamento"} onSave={() => createRecord({
          categoria_id: category,
          data: "",
          valor: parseInt(value) * (isPositive ? 1 : -1),
          nome: name,
        }).then((e) => console.log("then: ", e)).catch((e) => console.error(e))}>
          <Box>
            {
              sectionIndex === 0 &&
              <Box>
                <ToggleButtons onSelect={(pos) => setIsPositive(pos)}/>
                <Box flexDirection="row" justifyContent='center' alignItems ='center' px={10} pt={5}>
                  <Balance fontSize={40} mr={0}>R$ </Balance>
                  <AutoSizingInputField placeholder={"0,00"} keyboardType={'numeric'} onTextChange={setValue} ></AutoSizingInputField>
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
                        <ActionButton title={"" /* Opção escolhida */} onPress={Something} key={`input_action_${field.id}`}></ActionButton>
                      }
                      {
                        field.type === "text" &&
                        <SimpleInputField placeholder={field.placeholder} onChangeText={setName} key={`input_text_${field.id}`}/>
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
          {transactions.slice().reverse().map((transaction, index) => (
            <TransactionCard
              key={`transaction_card_${index}`}
              isPositive={transaction.valor > 0}
              description={`${transaction.nome}\n${transaction.data}`}
              amount={Math.abs(transaction.valor).toFixed(2)}
            />
          ))}
{/*          <TransactionCard isPositive={true} description="Burger King" amount="36.00" tag={"salário"}/>
          <TransactionCard isPositive={false} description="Burger King" amount="30.00"/>*/}
        </ScrollView>
      </VStack>

    </Box>
  );
}