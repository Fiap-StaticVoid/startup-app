import {Box, FormControl, IInputProps, Input} from "native-base";
import React, {useState} from "react";
import {KeyboardTypeOptions, TextInputKeyPressEventData} from "react-native";

interface SimpleInputFieldProps extends IInputProps {
  placeholder: string;
  text: string;
  keyboard?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  maxWidth?: string;
}

export function SimpleInputField({placeholder, keyboard, text, onChangeText, maxLength, maxWidth, ...rest}: SimpleInputFieldProps) {

  const [value, setValue] = useState<string>(text);

  const handleChangeText = (text: string) => {
    let txt = text;
    
    if (keyboard === 'numeric') {
      txt = text.replace(/[^0-9.]/g, '');
    }

    setValue(txt);

    if (onChangeText) {
      onChangeText(txt);
    }
  };

  const handleKeyPress = (event: { nativeEvent: TextInputKeyPressEventData }) => {
    const { key } = event.nativeEvent;
    
    if (/[^0-9.]/.test(key)) {
      return;
    }
    
    setValue((prevValue) => prevValue + key);
  };

  return (
    <Box flex={1} w={"100%"} bgColor="transparent">
      <FormControl>
        <Input
          value={value}
          py={0}
          variant="unstyled"
          textAlign="right"
          maxLength={maxLength ?? 24}
          h={8}
          onKeyPress={handleKeyPress}
          keyboardType={(keyboard ?? 'default') as KeyboardTypeOptions}
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