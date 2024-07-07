import {Text, IButtonProps, Button} from "native-base";
import {ReactNode} from "react";

interface DefaultButtonProps extends IButtonProps {
  children: ReactNode;
  onPress: () => void;
}

export function DefaultButton({ children, onPress, ...rest }: DefaultButtonProps) {
  return (
    <Button width="100%" onPress={onPress} backgroundColor="accent.300" borderRadius={17} marginTop={10} fontFamily="bodyBold" py={3.5} {...rest}>
      <Text fontSize={18} fontWeight="bold" color="white.300">{children}</Text>
    </Button>
  )
}