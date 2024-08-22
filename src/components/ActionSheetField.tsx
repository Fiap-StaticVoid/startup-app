import {Text, ITextProps, Box} from "native-base";
import {ReactNode} from "react";
import {StraightLine} from "./StraightLine";

interface ActionSheetFieldProps extends ITextProps {
  children: ReactNode;
  title: string
}

export function ActionSheetField({ title, children, ...rest }: ActionSheetFieldProps) {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" px={3} py={0.5}>
      <Text fontSize={16} mr={5} fontFamily="bodySemiBold" {...rest}>
        {title}
      </Text>
      {children}
    </Box>
  )
}