import {Text, ITextProps} from "native-base";
import {ReactNode} from "react";

interface BalanceProps extends ITextProps {
  children: ReactNode;
}
export function Balance({ children, ...rest }: BalanceProps) {
  return (
    <Text
      fontSize={48}
      fontFamily="balance"
      color="accent.300"
      {...rest}>
      {children}
    </Text>
  )
}