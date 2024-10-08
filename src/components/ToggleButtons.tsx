﻿import React, { useState } from 'react';
import {Box} from 'native-base';
import {IconButton} from "./IconButton";

interface ToggleProps {
  onSelect: (isPositive: boolean) => void;
  defaultValue?: boolean;
}

export function ToggleButtons(props: ToggleProps) {
  const [selected, setSelected] = useState(props.defaultValue ? '1' : '2');

  const handleButtonPress = (buttonId: '1' | '2') => {
    setSelected(buttonId);
    props.onSelect(buttonId === '1');
  };

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" mb={0}>
      <IconButton size={20} enabledOpacity={0.5} disabledOpacity={1} isDisabled={selected === '1'} iconName={"add"} onPress={() => handleButtonPress('1')} />
      <IconButton size={20} enabledOpacity={0.5} disabledOpacity={1} isDisabled={selected === '2'} iconName={"remove"} onPress={() => handleButtonPress('2')} />
    </Box>
  );
};