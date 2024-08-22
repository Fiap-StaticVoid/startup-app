import {Text, IButtonProps, Box} from "native-base";
import {TouchableWithoutFeedback} from "react-native";

interface SecondaryButtonProps extends IButtonProps {
  messageText: string;
  actionText: string;
  onPress?: () => void;
}

export function SecondaryButton({ messageText, actionText, onPress}: SecondaryButtonProps) {
  return (
    <Box width="100%" flexDirection="row" fontFamily="bodyBold" justifyContent="center" marginTop={3} >
      <Text fontSize={16} onPress={onPress}>{messageText} </Text>
      <TouchableWithoutFeedback onPress={onPress}><Text fontWeight="bold" color="accent.300" fontSize={16}>{actionText}</Text></TouchableWithoutFeedback>
    </Box>
  )
}