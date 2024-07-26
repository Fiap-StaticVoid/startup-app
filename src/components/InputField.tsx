import {Button, FormControl, Icon, Input} from "native-base";
import React from "react";
import {Ionicons} from "@expo/vector-icons";

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

export function InputField(props: InputFieldProps): React.JSX.Element {
  
  const [show, setShow] = React.useState(false);
  
  return (
    <FormControl mt={5}>
      <Input variant="outline"
             borderRadius={15}
             placeholder={props.placeholder}
             borderColor="accent.300"
             fontFamily="body"
             placeholderTextColor="black.300"
             focusOutlineColor="accent.300"
             type={props.isPassword ? (show ? "text" : "password") : "text"}
             secureTextEntry={props.isPassword ? !show : false}
             InputRightElement={
               props.isPassword ? (
                 <Button
                   onPress={() => setShow(!show)}
                   variant="unstyled"
                   _pressed={{ bg: 'transparent' }}
                   p={2}
                 >
                   <Icon
                     as={Ionicons}
                     name={show ? 'eye-off' : 'eye'}
                     size={5}
                     color="accent.300"
                   />
                 </Button>
               ) : undefined
             }
             
             _light={{bg:"white.300", _focus:{bg:"white.300"}}}
             _dark={{bg:"white.300", _focus:{bg:"white.300"}}} />
    </FormControl>
  )
}