import {Text, ITextProps, Box, ScrollView, VStack} from "native-base";
import {ReactNode} from "react";
import {TransactionRecord, TransactionRecordProps} from "./TransactionRecord";
import {TransactionTag} from "./TransactionTag";
import {StraightLine} from "./StraightLine";

interface TransactionCardProps extends TransactionRecordProps {
  tag?: string;
  onPressDelete: () => void;
  isEditable: boolean;
}

export function TransactionCard(props: TransactionCardProps) {
  return (
    <VStack>
      <TransactionRecord isEditable={props.isEditable} isPositive={props.isPositive} description={props.description} amount={props.amount} onPressDelete={props.onPressDelete}>
        {props.tag && <TransactionTag>{props.tag}</TransactionTag>}
      </TransactionRecord>
      <StraightLine/>
    </VStack>
  )
}