import {Box, Image, ScrollView, Text, useToast, VStack} from "native-base";
import Logo from './assets/LOGO_Black.png';
import {SecondaryButton} from "./components/SecondaryButton";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IconButton} from "./components/IconButton";
import {TransactionCard} from "./components/TransactionCard";
import React, {useEffect, useRef} from "react";
import ActionSheetBase, {ActionSheetRef} from "./components/ActionSheetBase";
import {ToggleButtons} from "./components/ToggleButtons";
import {AutoSizingInputField} from "./components/AutoSizingInputField";
import {ActionSheetField} from "./components/ActionSheetField";
import {SimpleInputField} from "./components/SimpleInputField";
import {ActionButton} from "./components/ActionButton";
import {APIHistorico, Historico} from "./services/api/historico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RadioButton} from "./components/RadioButton";

export default function Dashboard({navigation}: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      setSectionIndex(0);
      setSelectedFields({...selectedFields, 1: {inputId: 2, label: "Nunca"}});
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
        { id: 1, label: "Nome", placeholder: "Nome", type: "text" },
        { id: 2, label: "Recorrência", placeholder: "", type: "action" },
        //{ id: 3, label: "Tag", placeholder: "", type: "action" },
      ]
    },
    {
      id: 2,
      title: "Recorrência",
      inputFields: [
        { id: 1, label: "Nunca", placeholder: "", type: "radio" },
        { id: 2, label: "Diariamente", placeholder: "", type: "radio" },
        { id: 3, label: "Semanalmente", placeholder: "", type: "radio" },
        { id: 4, label: "Mensalmente", placeholder: "", type: "radio" },
        { id: 5, label: "Anualmente", placeholder: "", type: "radio" },
      ]
    }
  ];
  
  const [selectedFields, setSelectedFields] = React.useState<{[sectionId: number]: {inputId: number, label: string}}>({});

  function openRecurrenceScreen() {
    setSectionIndex(1);
  }
  
  let [historyAPI, setHistoryAPI] = React.useState(new APIHistorico(null));
  const [isEditable, setIsEditable] = React.useState(false);
  const [isPositive, setIsPositive] = React.useState(true);
  const [category, setCategory] = React.useState('');
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  const [transactions, setTransactions] = React.useState<Historico[]>([]);
  const [balance, setBalance] = React.useState((0).toFixed(2));

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };
  
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
      
      let api = new APIHistorico(token);
      setHistoryAPI(api);
      
      setTransactions(await api.read().then((b) => {
        let a = b.reduce((acc, transaction) => acc + transaction.valor, 0);
        setBalance(a.toFixed(2));
        return b;
      }));
      
    }

    retrieveHistory();
  }, []);

  async function createRecord(historico: Historico) {
    if (historico.valor === 0 || isNaN(historico.valor)) {
      toast.show({
        title: "Valor inválido",
        description: "O valor informado não é válido. Por favor, verifique o valor e tente novamente.",
        duration: 3000,
        backgroundColor: "red.500",
        
      });
      
      throw new Error("Valor inválido");
    }
    
    historico.categoria_id = null;
    historico.data = new Date().toISOString().slice(0, -2);
    
    calculateBalance(historico.valor, true);
    setTransactions([...transactions, historico]);
    
    historyAPI.create(historico).then().catch((e) => console.error(e));
    
    console.log("Token: ", historyAPI.token);
  }
  
  function calculateBalance(value: number, add: boolean) {
    if (value == 0) return;
    setBalance((total) => (parseFloat(total) + value * (add ? 1 : -1)).toFixed(2));
  }

  async function deleteRecord(id: string) {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    calculateBalance(transactions.find((transaction) => transaction.id === id)?.valor ?? 0, false);
    historyAPI.delete(id).then().catch((e) => console.log(e));
  }
  
  function handleScreens(label: string, type: string, sectionId: number, inputId: number) {
    if (type === "action") {
      if (label === "Recorrência") {
        openRecurrenceScreen();
      }
    } else if (type === "text") {
      
    } else if (type === "radio") {
      
      setSelectedFields(prev => {
        return {...prev, [sectionId]: {label, inputId}};
      });
      setSectionIndex(0);
    }
  }

  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
{        <SecondaryButton messageText="" actionText={isEditable ? "Voltar" : "Editar"} onPress={() => setIsEditable(!isEditable)}/>}
      </Box>

      <Box position="absolute" top="65px" right={15}>
        <IconButton iconName="add" isDisabled={false} onPress={() => {
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

        <ActionSheetBase ref={actionSheetRef} title={sections[sectionIndex].title} onSave={() => createRecord({
          categoria_id: category,
          data: "",
          valor: parseInt(value) * (isPositive ? 1 : -1),
          nome: name,
        })}>
          <Box>
            {sectionIndex === 0 && (
              <Box>
                <ToggleButtons onSelect={(pos) => setIsPositive(pos)}/>
                <Box flexDirection="row" justifyContent='center' alignItems='center' px={10} pt={5}>
                  <Balance fontSize={40} mr={0}>R$ </Balance>
                  <AutoSizingInputField placeholder={"0,00"} keyboardType={'numeric'} onTextChange={(t) => {
                    setValue(t);
                    let value = parseInt(t.replace(/[^0-9]/g, ''));
                    actionSheetRef.current?.setCanClose(!isNaN(value) && value !== 0);
                  }} />
                </Box>
              </Box>
            )}
            <Box w="100%" borderColor="accent.300" borderWidth={1.5} borderRadius={15} py={1.5} m={5} mb={-3}>
              {sections[sectionIndex].inputFields.map((field) => (
                <Box key={`field_container_${field.id}`}>
                  <ActionSheetField title={field.label} onPress={() => { handleScreens(field.label, field.type, sections[sectionIndex].id, field.id) }}>
                    {field.type === "action" && (
                      <ActionButton title={selectedFields[field.id]?.label ?? "AEIou"} key={`input_action_${field.id}`} />
                    )}
                    {field.type === "radio" && (
                      <RadioButton selected={selectedFields[sections[sectionIndex].id]?.inputId ?? 0} buttonId={field.id} key={`input_action_${field.id}`} />
                    )}
                    {field.type === "text" && (
                      <SimpleInputField text={name} placeholder={field.placeholder} onChangeText={setName} key={`input_text_${field.id}`} />
                    )}
                  </ActionSheetField>
                  {sections[sectionIndex].inputFields.indexOf(field) < sections[sectionIndex].inputFields.length - 1 && (
                    <Text textAlign={"center"} mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"} key={`line_${field.id}`}>
                      ____________________________________________________________________
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </ActionSheetBase>

        <ScrollView>
          {transactions.slice().reverse().map((transaction, index) => (
            <TransactionCard isEditable={isEditable} 
              onPressDelete={() => deleteRecord(transaction.id ?? "")}
              key={`transaction_card_${index}`} // Ensure each transaction has a unique key
              isPositive={transaction.valor > 0}
              description={`${transaction.nome}\n${formatDate(transaction.data)}`}
              amount={Math.abs(transaction.valor).toFixed(2)}
            />
          ))}
        </ScrollView>
      </VStack>
    </Box>

  );
}