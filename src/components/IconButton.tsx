import React from 'react';
import {Button, Icon, IIconProps} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

interface IconButtonProps extends IIconProps {
  iconName: string;
  iconAs?: any;
  onPress?: () => void;
  isDisabled?: boolean;
}

export function IconButton({ iconName, iconAs, onPress, isDisabled, ...rest }: IconButtonProps) {
  const disabled = isDisabled ?? false;
  const name = disabled ? `${iconName}-outline` : iconName
  const opacity = isDisabled === undefined || disabled ? 1 : 0.5;
  
  return (
    <Button onPress={onPress} bg='transparent' isDisabled={disabled} opacity={opacity}
      leftIcon={<Icon as={iconAs ?? Ionicons} m={-1} name={name} size={10} color="accent.300" borderColor="white.300" {...rest} opacity={opacity} />}
      _hover={{bg:'transparent'}} _pressed={{bg:'transparent'}}
      _disabled={{bg:'transparent', opacity: 1}} _focus={{bg:'transparent'}}
    />
  )
}
