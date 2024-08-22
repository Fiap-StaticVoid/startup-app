import React from 'react';
import {Button, Icon, IIconProps} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

interface IconButtonProps extends IIconProps {
  iconName: string;
  disabledOpacity?: number;
  enabledOpacity?: number;
  color?: string;
  iconAs?: any;
  onPress?: () => void;
  isDisabled?: boolean;
}

export function IconButton({ iconName, color, iconAs, onPress, isDisabled, disabledOpacity = 0.5, enabledOpacity = 1, ...rest }: IconButtonProps) {
  const disabled = isDisabled ?? false;
  const opacity = isDisabled === undefined || disabled ? disabledOpacity : enabledOpacity;
  
  return (
    <Button onPress={onPress} bg='transparent' isDisabled={disabled} opacity={opacity}
      leftIcon={<Icon as={iconAs ?? Ionicons} m={-1} name={iconName} size={10} color={color ?? "accent.300"} borderColor="white.300" {...rest} opacity={opacity} />}
      _hover={{bg:'transparent'}} _pressed={{bg:'transparent'}}
      _disabled={{bg:'transparent', opacity: 1}} _focus={{bg:'transparent'}}
    />
  )
}
