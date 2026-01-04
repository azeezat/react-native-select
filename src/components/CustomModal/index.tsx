/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '../../styles/colors';
import { TCustomModalControls } from '../../types/index.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomModal = ({
  visible,
  modalControls,
  children,
  onRequestClose,
}: {
  modalControls?: TCustomModalControls;
} & ModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      testID="react-native-input-select-modal"
      transparent={true}
      animationType="fade"
      {...modalControls?.modalProps}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          onPress={onRequestClose}
          style={[styles.modalContainer, modalControls?.modalBackgroundStyle]}
          aria-label="close modal"
        >
          {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
          <TouchableWithoutFeedback accessible={false}>
            <View
              style={[
                { paddingBottom: insets.bottom },
                styles.modalOptionsContainer,
                modalControls?.modalOptionsContainerStyle,
              ]}
              testID="react-native-input-select-modal-body"
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOptionsContainer: {
    maxHeight: '50%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 5,
  },
});

export default CustomModal;
