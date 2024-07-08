import {Box, Text} from "native-base";
import React from "react";
import {Balance} from "./Balance";
import {ToggleButtons} from "./ToggleButtons";
import {AutoSizingInputField} from "./AutoSizingInputField";
import {ActionSheetField} from "./ActionSheetField";
import {SimpleInputField} from "./SimpleInputField";
import {StraightLine} from "./StraightLine";
import {ActionButton} from "./ActionButton";

export function ActionSheetLancamento() {
  function Something() {

  }
  
  return <Box>
    <ToggleButtons/>
    <Box flexDirection="row" justifyContent='center' alignItems='center' px={10} pt={5}>
      <Balance fontSize={40} mr={0}>R$ </Balance>
      <AutoSizingInputField placeholder={"0,00"}></AutoSizingInputField>
      {/*<SimpleInputField textAlign="left" fontSize={40} maxLength={8} fontFamily={"record"} color={"accent.300"} h={16} placeholder={"100,00"} ></SimpleInputField>*/}
    </Box>

    <Box w="100%" borderColor="accent.300" borderWidth={1.5} borderRadius={15} py={1.5} m={5} mb={-3}>
      <ActionSheetField title={"Nome"}>
        <SimpleInputField placeholder="Nome"/>
      </ActionSheetField>

      {/* Suddenly StraightLine stopped rendering for some reason */}
      {/*<StraightLine h={0.5} w="100%"/>*/}
      <Text textAlign={"center"} mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"}>____________________________________________________________________</Text>

      <ActionSheetField title={"Recorrência"}>
        <ActionButton title={"" /* Opção escolhida */} onPress={Something}></ActionButton>
      </ActionSheetField>

      <Text textAlign={"center"}  mt={-2} mb={2} color={"accent.300"} fontFamily={"bodyBold"}>____________________________________________________________________</Text>

      <ActionSheetField title={"Tag"}>
        <ActionButton title={"" /* Opção escolhida */} onPress={Something}></ActionButton>
      </ActionSheetField>
    </Box>

  </Box>
}