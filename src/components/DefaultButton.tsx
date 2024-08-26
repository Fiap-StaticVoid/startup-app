import {Text, IButtonProps, Button} from "native-base";
import {ReactNode} from "react";

interface DefaultButtonProps extends IButtonProps {
  children: ReactNode;
  isVisible: boolean;
  onPress: () => void;
}

export function DefaultButton({ children, isVisible, onPress, ...rest }: DefaultButtonProps) {
  if (!isVisible) {
    return null;
  }
  
  return (
    <Button width="100%" onPress={onPress} backgroundColor="accent.300" borderRadius={17} fontFamily="bodyBold" py={3.5} {...rest}>
      <Text fontSize={18} fontWeight="bold" color="white.300">{children}</Text>
    </Button>
  )
}