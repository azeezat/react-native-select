/* eslint-disable react-native/no-inline-styles */
import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useImperativeHandle,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../styles/colors';
import { TCustomModalControls } from 'src/types/index.types';

export interface CustomModalProps extends TCustomModalControls, ModalProps {
  // Add other prop types if needed
}

export interface CustomModalHandle {
  open: () => void;
  close: () => void;
}

// In iOS, `SafeAreaView` does not automatically account on keyboard.
// Therefore, for iOS we need to wrap the content in `KeyboardAvoidingView`.
const ModalContentWrapper = ({ children }: PropsWithChildren): ReactElement => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView style={[{ flex: 1 }]} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const CustomModal = forwardRef<CustomModalHandle, CustomModalProps>(
  (
    {
      modalBackgroundStyle, //kept for backwards compatibility
      modalOptionsContainerStyle, //kept for backwards compatibility
      modalControls,
      modalProps, //kept for backwards compatibility
      children,
    }: CustomModalProps,
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    //  customizes the instance value that is exposed to parent components when using ref
    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => closeEvents(),
    }));

    const closeEvents = () => {
      setIsVisible(false);
      modalControls?.modalProps?.closeModal?.(); //kept for backwards compatibility
      modalProps?.onDismiss?.(); //kept for backwards compatibility
      modalControls?.modalProps?.onDismiss?.();
    };

    return (
      <Modal
        testID="react-native-input-select-modal"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => closeEvents()}
        animationType="fade"
        {...modalControls?.modalProps}
        {...modalProps} //kept for backwards compatibility
      >
        {/*Used to fix the select with search box behavior in iOS*/}
        <ModalContentWrapper>
          <TouchableOpacity
            onPress={() => closeEvents()}
            style={[
              styles.modalContainer,
              styles.modalBackgroundStyle,
              modalControls?.modalBackgroundStyle || modalBackgroundStyle,
            ]}
            aria-label="close modal"
          >
            {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
            <TouchableWithoutFeedback onPress={() => {}}>
              <SafeAreaView
                style={[
                  styles.modalOptionsContainer,
                  modalControls?.modalOptionsContainerStyle ||
                    modalOptionsContainerStyle,
                ]}
                testID="react-native-input-select-modal-body"
              >
                {children}
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </ModalContentWrapper>
      </Modal>
    );
  }
);

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
