import {Text, ITextProps} from "native-base";
import {ReactNode} from "react";

interface HeaderProps extends ITextProps {
  children: ReactNode;
}
export function Header({ children, ...rest }: HeaderProps) {
  return (
    <Text fontSize={24} fontFamily="heading" mt={10} mb={5} {...rest}>
      {children}
    </Text>
  )
}