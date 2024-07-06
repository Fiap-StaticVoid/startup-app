import {Text, IButtonProps, Box} from "native-base";
import {TouchableWithoutFeedback} from "react-native";

interface SecondaryButtonProps extends IButtonProps {
  messageText: string;
  actionText: string;
}

export function SecondaryButton({ messageText, actionText }: SecondaryButtonProps) {
  return (
    <Box width="100%" flexDirection="row" justifyContent="center" marginTop={3}>
      <Text fontSize={16}>{messageText} </Text>
      <TouchableWithoutFeedback><Text fontWeight="bold" color="pink.300" fontSize={16}>{actionText}</Text></TouchableWithoutFeedback>
    </Box>
  )
}