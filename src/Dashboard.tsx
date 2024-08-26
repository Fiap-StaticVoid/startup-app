﻿import {Box, Image, ScrollView, Text, useToast, VStack} from "native-base";
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
import {
  APIHistorico,
  APILancamentoRecorrente,
  Historico,
  LancamentoRecorrente,
  TipoFrequencia
} from "./services/api/historico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RadioButton} from "./components/RadioButton";

export default function Dashboard({navigation}: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const openActionSheet = () => {
    setIsEditable(false);
    if (actionSheetRef.current) {
      setSectionIndex(0);
      setSelectedFields({...selectedFields, 2: {inputId: 1, label: "Nunca"}});
      actionSheetRef.current.open();
      setIsPositive(true);
      setCategory('');
      setValue('');
      setTextValues({});
    }
  };
  
  const toast = useToast();
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const sections = [
    {
      id: 1,
      title: "Lançamento",
      inputFields: [
        { id: 1, label: "Nome", placeholder: "Nome", type: "text", keyboardType: 'default' },
        { id: 2, label: "Recorrência", placeholder: "", type: "action", keyboardType: 'default' },
        { id: 3, label: "Quantas vezes", placeholder: "0", type: "text", keyboardType: 'numeric' },
        //{ id: 4, label: "Tag", placeholder: "", type: "action", keyboardType: 'default' },
      ]
    },
    {
      id: 2,
      title: "Recorrência",
      inputFields: [
        { id: 1, label: "Nunca", placeholder: "", type: "radio", keyboardType: 'default' },
        { id: 2, label: "Diariamente", placeholder: "", type: "radio", keyboardType: 'default' },
        { id: 3, label: "Semanalmente", placeholder: "", type: "radio", keyboardType: 'default' },
        { id: 4, label: "Mensalmente", placeholder: "", type: "radio", keyboardType: 'default' },
        { id: 5, label: "Anualmente", placeholder: "", type: "radio", keyboardType: 'default' },
      ]
    }
  ];
  
  const [selectedFields, setSelectedFields] = React.useState<{[sectionId: number]: {inputId: number, label: string}}>({[2]: {inputId: 1, label: "Nunca"}});

  function openRecurrenceScreen() {
    setSectionIndex(1);
  }
  
  let [recordAPI, setRecordAPI] = React.useState(new APIHistorico(null));
  let [recurrenceAPI, setRecurrenceAPI] = React.useState(new APILancamentoRecorrente(null));
  
  const [isEditable, setIsEditable] = React.useState(false);
  const [isPositive, setIsPositive] = React.useState(true);
  const [category, setCategory] = React.useState('');
  const [value, setValue] = React.useState('');
  const [textValues, setTextValues] = React.useState<{ [fieldId: number]: string }>({});
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
      
      let apiRecurrence = new APILancamentoRecorrente(token);
      setRecurrenceAPI(apiRecurrence);
      
      let apiRecord = new APIHistorico(token);
      setRecordAPI(apiRecord);
      
      let a = await apiRecord.read().then((b) => {
        let a = b.reduce((acc, transaction) => acc + transaction.valor, 0);
        setBalance(a.toFixed(2));
        return b;
      });
      
      console.log(a);
      
      setTransactions(a);
    }

    retrieveHistory();

    actionSheetRef.current?.setShowSaveButton(sectionIndex === 0);
  }, [sectionIndex]);

  function getRecurrenceType(label: string) {
    return label === "Diariamente" ? TipoFrequencia.diario : label === "Semanalmente" ? TipoFrequencia.semanal : label === "Mensalmente" ? TipoFrequencia.mensal : TipoFrequencia.anual;
  }
  
  function getEndDate(recurringType: TipoFrequencia, amount: number) {
    let date = new Date();

    switch (recurringType) {
      case TipoFrequencia.diario:
        date.setDate(date.getDate() + amount);
        break;
      case TipoFrequencia.semanal:
        date.setDate(date.getDate() + (amount * 7));
        break;
      case TipoFrequencia.mensal:
        date.setMonth(date.getMonth() + amount);
        break;
      case TipoFrequencia.anual:
        date.setFullYear(date.getFullYear() + amount);
        break;
      default:
        throw new Error('Invalid recurrence type');
    }

    return date;
  }
  
  async function createRecord(record: Historico, recurrence: string, amount: number = 0) {
    console.log("record: ", record, "recurrence: ", recurrence, "amount: ", amount, "textValues: ", JSON.stringify(textValues));
    if (record.valor === 0 || isNaN(record.valor)) {
      toast.show({
        title: "Valor inválido",
        description: "O valor informado não é válido. Por favor, verifique o valor e tente novamente.",
        duration: 3000,
        backgroundColor: "red.500",
        
      });
      
      throw new Error("Valor inválido");
    }

    let date =  new Date();
    
    record.categoria_id = null;
    record.data = date.toISOString().slice(0, -2);
    
    if (recurrence !== "Nunca") {
      let rec: LancamentoRecorrente = {
        valor: record.valor,
        inicia_em: date.toISOString().slice(0, -2),
        termina_em: getEndDate(getRecurrenceType(recurrence), amount).toISOString().slice(0, -2),
        categoria_id: null,
        nome: record.nome,
        tipo_frequencia: getRecurrenceType(recurrence),
        frequencia: 1
      };
      console.log("created rec: ", rec);
      recurrenceAPI.create(rec).then().catch((e) => console.error(e));
    } else {
      recordAPI.create(record).then().catch((e) => console.error(e));
    }

    calculateBalance(record.valor, true);
    setTransactions([...transactions, record]);
  }
  
  function calculateBalance(value: number, add: boolean) {
    if (value == 0) return;
    setBalance((total) => (parseFloat(total) + value * (add ? 1 : -1)).toFixed(2));
  }

  async function deleteRecord(id: string) {
    let record = transactions.find((transaction) => transaction.id === id);

    if (record === undefined) {
      console.error("Failed to find record with id: ", id);
      return;
    } 
    
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    calculateBalance(record.valor ?? 0, false);
    
    recordAPI.delete(id).then().catch((e) => console.log(e));
    
    if (record.lancamento_id !== null) {
      recurrenceAPI.delete(record.lancamento_id).then().catch((e) => console.log(e));
    }
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
    
    actionSheetRef.current?.setShowSaveButton(sectionIndex == 0);
  }

  function handleTextChange(fieldId: number, text: string) {
    setTextValues(prev => ({
      ...prev,
      [fieldId]: text
    }));
  }


  function getFieldLabel(field: { id: number; label: string; placeholder: string; type: string }) {
    return selectedFields[field.id]?.label ?? "";
  }

  function canShowAmountField(sectionIndex: number, fieldId: number): boolean {
    return (sectionIndex === 0 && (fieldId === 3 && selectedFields[2]?.label !== "Nunca" || fieldId !== 3)) || sectionIndex !== 0;
  }

  function shouldShowLine(sectionIndex: number, fieldId: number): boolean {
    const fieldIndex = sections[sectionIndex].inputFields.findIndex(field => field.id === fieldId);
    const isLastField = fieldIndex === sections[sectionIndex].inputFields.length - 1;

    if (isLastField) return false;

    const nextFieldId = sections[sectionIndex].inputFields[fieldIndex + 1].id;

    return canShowAmountField(sectionIndex, fieldId) && canShowAmountField(sectionIndex, nextFieldId);
  }


  return (
    <Box flex={1} bgColor="white.300">
      <Box position="absolute" top="65px" left={-65}>
{        <SecondaryButton messageText="" actionText={isEditable ? "Voltar" : "Editar"} onPress={() => setIsEditable(!isEditable)}/>}
      </Box>

      <Box position="absolute" top="65px" right={15}>
        <IconButton iconName="add" isDisabled={false} onPress={() => {
          openActionSheet();
        }}/>
      </Box>

      <VStack flex={1} alignItems="left" p={6} justifyContent="flex-start">
        <Image source={Logo} alt={"Logo PiggyGuard"} alignSelf="center" mt={10}/>

        <Header mb={0}>Saldo atual</Header>
        <Balance color={parseInt(balance) > 0 ? "positive.300" : parseInt(balance) < 0 ? "negative.300" : "accent.300"}>{parseInt(balance) < 0 ? "-" : ""}R$ {Math.abs(parseInt(balance)).toFixed(2)}</Balance>
        <Header mb={2} mt={3}>Extrato</Header>

        <ActionSheetBase ref={actionSheetRef} title={sections[sectionIndex].title} onSave={() => createRecord({
          categoria_id: category, data: "", valor: parseInt(value) * (isPositive ? 1 : -1), nome: textValues[1] ?? "", lancamento_id: ""},
          selectedFields[2].label ?? "Nunca", parseInt(textValues[3]))}>
          <Box>
            {sectionIndex === 0 && (
              <Box>
                <ToggleButtons defaultValue={isPositive} onSelect={(pos) => setIsPositive(pos)}/>
                <Box flexDirection="row" justifyContent='center' alignItems='center' px={10} pt={5}>
                  <Balance fontSize={40} mr={0}>R$ </Balance>
                  <AutoSizingInputField defaultValue={value} placeholder={"0,00"} keyboardType={'numeric'} onTextChange={(t) => {
                    setValue(t);
                    let value = parseInt(t.replace(/[^0-9]/g, ''));
                    actionSheetRef.current?.setCanClose(!isNaN(value) && value !== 0);
                  }} />
                </Box>
              </Box>
            )}
            <Box w="100%" borderColor="accent.300" borderWidth={1.5} borderRadius={15} py={1.5} m={5}>
              {sections[sectionIndex].inputFields.map((field) => (
                <Box key={`field_container_${field.id}`}>
                  {canShowAmountField(sectionIndex, field.id) && (<ActionSheetField title={field.label} onPress={() => { handleScreens(field.label, field.type, sections[sectionIndex].id, field.id) }}>
                    {field.type === "action" && (
                      <ActionButton title={getFieldLabel(field)} key={`input_action_${field.id}`} />
                    )}
                    {field.type === "radio" && (
                      <RadioButton selected={selectedFields[sections[sectionIndex].id].inputId ?? 0} buttonId={field.id} key={`input_action_${field.id}`} />
                    )}
                    {field.type === "text" && (
                      <SimpleInputField text={textValues[field.id] ?? ""} keyboard={field.keyboardType ?? 'default'} placeholder={field.placeholder} onChangeText={text => handleTextChange(field.id, text)} key={`input_text_${field.id}`} />
                    )}
                  </ActionSheetField>)}
                  {shouldShowLine(sectionIndex, field.id) && (
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
              description={`${transaction.nome === null ? "" : (transaction.nome + "\n")}${formatDate(transaction.data)}${transaction.nome === null ? "\n" : ""}`}
              amount={Math.abs(transaction.valor).toFixed(2)}
            />
          ))}
        </ScrollView>
      </VStack>
    </Box>

  );
}