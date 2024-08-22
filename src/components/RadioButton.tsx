import {ITextProps, Box, Pressable} from "native-base";
import {IconButton} from "./IconButton";
import {MaterialIcons} from "@expo/vector-icons";

interface RadioButtonProps extends ITextProps {
  selected: number;
  buttonId: number;
  onPress?: () => void;
}

export function RadioButton(props: RadioButtonProps) {
  return (
    <Pressable onPress={props.onPress} flexDirection="row">
        <IconButton enabledOpacity={0} disabledOpacity={1} isDisabled={props.buttonId == props.selected} iconAs={MaterialIcons} iconName={"check"} size={6} m={-5} onPress={props.onPress}/>
    </Pressable>
  )
}