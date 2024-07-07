import React from 'react';
import {Button, Icon, IIconProps} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

interface IconButtonProps extends IIconProps {
  iconName: string;
  onPress?: () => void;
}

export function IconButton({ iconName, onPress, ...rest }: IconButtonProps) {
  return (
    <Button onPress={onPress} bg="white.300"
      leftIcon={<Icon as={Ionicons} name={iconName} size={10} color="accent.300" borderColor="white.300" {...rest} />}
    _hover={{bg:"white.300"}} _pressed={{bg:"white.300"}}
    />
  )
}
