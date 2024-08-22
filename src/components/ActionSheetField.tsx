import {Text, ITextProps, Box, Pressable} from "native-base";
import {ReactNode} from "react";
import {StraightLine} from "./StraightLine";

interface ActionSheetFieldProps extends ITextProps {
  children: ReactNode;
  title: string
  onClick?: () => void;
}

export function ActionSheetField({ title, children, onPress, ...rest }: ActionSheetFieldProps) {
  return (
    <Pressable onPress={onPress} width="100%" px={3} py={0.5}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text fontSize={16} mr={5} fontFamily="bodySemiBold" {...rest}>
          {title}
        </Text>
        {children}
      </Box>
    </Pressable>
  );
}