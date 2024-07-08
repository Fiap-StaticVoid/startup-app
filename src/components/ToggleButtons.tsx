import React, { useState } from 'react';
import {Box} from 'native-base';
import {IconButton} from "./IconButton";

export function ToggleButtons() {
  const [selected, setSelected] = useState('1');

  const handleButtonPress = (buttonId: '1' | '2') => {
    setSelected(buttonId);
  };

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" mb={0}>
      <IconButton size={20} opacity={1} isDisabled={selected === '1'} iconName={"add"} onPress={() => handleButtonPress('1')} />
      <IconButton size={20} isDisabled={selected === '2'} iconName={"remove"} onPress={() => handleButtonPress('2')} />
    </Box>
  );
};