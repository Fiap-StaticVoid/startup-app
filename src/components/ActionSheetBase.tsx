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
  setCanSave: (close: boolean) => void;
  setShowSaveButton: (show: boolean) => void;
}

const ActionSheetBase = forwardRef<ActionSheetRef, DefaultActionSheetProps>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
  const [canSave, setCanSave] = React.useState(false);
  const [showSaveButton, setShowSaveButton] = React.useState(true);
  
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
    setCanSave: (close: boolean) => {
      setCanSave(close);
    },
    setShowSaveButton: (show: boolean) => {
      setShowSaveButton(show);
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
          
          <DefaultButton isVisible={showSaveButton} isDisabled={!canSave} onPress={async () => {
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
