import {Text, IButtonProps, Button} from "native-base";
import {ReactNode} from "react";

interface DefaultButtonProps extends IButtonProps {
  children: ReactNode;
}

export function DefaultButton({ children, ...rest }: DefaultButtonProps) {
  return (
    <Button width="100%" backgroundColor="pink.300" borderRadius={17} marginTop={10} py={3.5} {...rest}>
      <Text fontSize={18} fontWeight="bold" color="white.300" onPress={() => {
        
      }}>{children}</Text>
    </Button>
  )
}