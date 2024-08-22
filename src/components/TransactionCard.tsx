import {Text, ITextProps, Box, ScrollView, VStack} from "native-base";
import {ReactNode} from "react";
import {TransactionRecord, TransactionRecordProps} from "./TransactionRecord";
import {TransactionTag} from "./TransactionTag";
import {StraightLine} from "./StraightLine";

interface TransactionCardProps extends TransactionRecordProps {
  tag?: string;
}

export function TransactionCard(props: TransactionCardProps) {
  return (
    <VStack>
      <TransactionRecord isPositive={props.isPositive} description={props.description} amount={props.amount}>
        {props.tag && <TransactionTag>{props.tag}</TransactionTag>}
      </TransactionRecord>
      <StraightLine/>
    </VStack>
  )
}