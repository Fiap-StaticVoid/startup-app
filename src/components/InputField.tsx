import {Button, FormControl, Icon, Input} from "native-base";
import React from "react";
import {Ionicons} from "@expo/vector-icons";

interface InputFieldProps {
  placeholder: string;
  isPassword: boolean;
}

export function InputField(props: InputFieldProps): React.JSX.Element {
  
  const [show, setShow] = React.useState(false);
  
  return (
    <FormControl mt={5}>
      <Input variant="outline"
             borderRadius={15}
             placeholder={props.placeholder}
             borderColor="pink.300"
             placeholderTextColor="black.300"
             focusOutlineColor="pink.300"
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
                     color="pink.300"
                   />
                 </Button>
               ) : undefined
             }
             
             _light={{bg:"white.300", _focus:{bg:"white.300"}}}
             _dark={{bg:"white.300", _focus:{bg:"white.300"}}} />
    </FormControl>
  )
}