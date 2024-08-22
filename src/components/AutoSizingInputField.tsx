import React, { useState, useEffect, useRef } from 'react';
import { Box, Input } from 'native-base';
import {useWindowDimensions, StyleSheet, Text as RNText, KeyboardTypeOptions} from 'react-native';

interface SimpleInputFieldProps {
  placeholder?: string;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onTextChange?: (text: string) => void;
}

export function AutoSizingInputField(props: SimpleInputFieldProps): React.JSX.Element {
  const [text, setText] = useState<string>('');
  const [inputWidth, setInputWidth] = useState<number>(100); // Initial width
  const { width: screenWidth } = useWindowDimensions(); // Get screen width for responsiveness

  const hiddenTextRef = useRef<RNText>(null);

  const measureTextWidth = () => {
    if (hiddenTextRef.current) {
      hiddenTextRef.current.measure((x, y, width) => {
        setInputWidth(width + 45); // Add padding
      });
    }
  };

  useEffect(() => {
    measureTextWidth();
  }, [text]);

  return (
    <Box px={2}>
      <Input pb={0}
        variant="unstyled"
        textAlign={"center"}
        maxLength={10}
        placeholder={props.placeholder}
        fontFamily="record"
        fontSize={40}
        color={"accent.300"}
        keyboardType={props.keyboardType}
        
        placeholderTextColor="accent.100"
        width={`${Math.min(inputWidth, screenWidth - 40)}px`} // Adjust width based on screen size
        value={text}
        onChangeText={(newText: string) => {
          let text = newText.replace(/[^0-9]/g, '').replace(/^0+/, '');
          setText(text);
          props.onTextChange?.(text);
        }}
      />
      <RNText
        ref={hiddenTextRef}
        style={styles.hiddenText}
        onLayout={measureTextWidth} // Measure text width on layout
      >
        {text || props.placeholder}
      </RNText>
    </Box>
  );
}

const styles = StyleSheet.create({
  hiddenText: {
    position: 'absolute',
    opacity: 0,
    fontSize: 40,
  },
});
