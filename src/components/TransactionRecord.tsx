import {Box, Icon, Text} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import React, {ReactNode} from "react";
import {Balance} from "./Balance";

export interface TransactionRecordProps {
  isPositive: boolean,
  description: string,
  amount: string,
  children?: ReactNode;
}

export function TransactionRecord(props: TransactionRecordProps) {
  const color = "accent.300" //props.isPositive ? "positive.300" : "negative.300";
  return (
    <Box flexDirection="row">
      <Icon as={Ionicons} name={props.isPositive ? "add" : "remove"} size="60" color={color} borderColor="white.300" alignSelf="center" mr={5} />
      <Box flexDirection="column">
        <Balance fontSize={32}>R$ {props.amount}</Balance>
        <Text mb={2} mt={-2}>{props.description}</Text>
        {props.children}
      </Box>
    </Box>
  )
}