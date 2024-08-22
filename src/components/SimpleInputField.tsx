import {Box, FormControl, IInputProps, Input} from "native-base";
import React from "react";

interface SimpleInputFieldProps extends IInputProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  maxWidth?: string;
}

export function SimpleInputField({placeholder, onChangeText, maxLength, maxWidth, ...rest}: SimpleInputFieldProps) {

  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };
  
  return (
    <Box flex={1} w={"100%"} bgColor="transparent">
      <FormControl>
        <Input
        py={0}
        variant="unstyled"
        textAlign="right"
        maxLength={maxLength ?? 24}
        h={8}
        fontSize={16}
        placeholder={placeholder}
        fontFamily="body"
        color={"accent.300"}
        placeholderTextColor="black.100"
        onChangeText={handleChangeText}
        {...rest}
  
        _light={{bg:'transparent', _focus:{bg:'transparent'}}}
        _dark={{bg:'transparent', _focus:{bg:'transparent'}}} />
      </FormControl>
    </Box>
  )
}