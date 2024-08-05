import React, {useImperativeHandle, forwardRef} from 'react';
import { Center, Actionsheet, Text } from 'native-base';
import { useDisclose } from 'native-base';
import {DefaultButton} from "./DefaultButton";
import useKeyboardBottomInset from "./CustomUseKeyboardBottomInset";

interface DefaultActionSheetProps {
  title: string;
  action?: string;
  onSave?: () => Promise<void>;
  children?: React.ReactNode;
}

export interface ActionSheetRef {
  open: () => void;
  setCanClose: (close: boolean) => void;
}

const ActionSheetBase = forwardRef<ActionSheetRef, DefaultActionSheetProps>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
  const [canClose, setCanClose] = React.useState(false);
  
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
    setCanClose: (close: boolean) => {
      setCanClose(close);
    }
  }));

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          bgColor="white.300"
          bottom={bottomInset}
          _dragIndicator={{
            bg: 'accent.300:alpha.30',
          }}
        >
          <Text fontFamily="bodyBold">{props.title}</Text>
          
          {props.children}
          
          <DefaultButton isDisabled={!canClose} onPress={async () => {
            onClose();
            if (props.onSave) {
              await props.onSave();
            }
          }}>{props.action ?? 'Salvar'}</DefaultButton>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
});

export default ActionSheetBase;
