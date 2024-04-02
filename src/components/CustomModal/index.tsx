import React, { ReactElement } from 'react';
import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  ModalProps, ViewStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { TCustomModalControls } from 'src/types/index.types';
import {
  KeyboardAvoidingView, Platform,
} from 'react-native';

type ScreenWrapperProps = {
  children: React.ReactNode;
  style: (ViewStyle | undefined)[];
};

const ScreenWrapper = ({ children, style }: ScreenWrapperProps): ReactElement => {
  return (
    <SafeAreaView {...style}>
      {
        Platform.OS === 'ios'
          ? (
            <KeyboardAvoidingView style={{ flex: 1 }}
                                  enabled
                                  keyboardVerticalOffset={Platform.select({ ios: 5, android: 500 })} behavior="padding">
              {children}
            </KeyboardAvoidingView>
          )
          : (
            <>
              {children}
            </>
          )
      }
    </SafeAreaView>
  );
};

const CustomModal = ({
  visible,
  onRequestClose,
  modalBackgroundStyle, //kept for backwards compatibility
  modalOptionsContainerStyle, //kept for backwards compatibility
  modalControls,
  modalProps, //kept for backwards compatibility
  children,
}: TCustomModalControls & ModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onRequestClose?.()}
      animationType="fade"
      {...modalControls?.modalProps}
      {...modalProps} //kept for backwards compatibility
    >
      <TouchableOpacity
        onPress={() => onRequestClose?.()}
        style={[
          styles.modalContainer,
          styles.modalBackgroundStyle,
          modalControls?.modalBackgroundStyle || modalBackgroundStyle,
        ]}
      >
        {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
        <TouchableWithoutFeedback onPress={() => {}}>
          <ScreenWrapper
            style={[
              styles.modalOptionsContainer,
              modalControls?.modalOptionsContainerStyle ||
                modalOptionsContainerStyle,
            ]}
          >
            {children}
          </ScreenWrapper>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackgroundStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalOptionsContainer: {
    maxHeight: '50%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 5,
  },
});

export default CustomModal;
