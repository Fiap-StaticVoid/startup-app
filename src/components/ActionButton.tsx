import {Text, ITextProps, Box} from "native-base";
import {ReactNode} from "react";
import {IconButton} from "./IconButton";
import {MaterialIcons} from "@expo/vector-icons";

interface ActionButtonProps extends ITextProps {
  title: string
  onPress: () => void;
}

export function ActionButton({ title, onPress, ...rest }: ActionButtonProps) {
  return (
    <Box flexDirection="row" >
      <Text fontSize={16} fontFamily="body" {...rest} onPress={onPress} color="accent.300">
        {title}
      </Text>
        <IconButton iconAs={MaterialIcons} iconName={"arrow-forward-ios"} size={4} onPress={onPress}/>
    </Box>
  )
}