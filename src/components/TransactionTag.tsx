import {Text, ITextProps, Box} from "native-base";
import {ReactNode} from "react";

interface TagProps extends ITextProps {
  children: ReactNode;
}

export function TransactionTag({ children }: TagProps) {
  return (
    <Box borderRadius={16} borderWidth={2} borderColor="accent.300" flexShrink={1} alignSelf="flex-start">
      <Text fontSize={16} fontFamily="bodyBold" color="accent.300" mx={3} my={1}>
        {children}
      </Text>
    </Box>
  )
}