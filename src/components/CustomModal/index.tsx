import React from 'react';
import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../styles/colors';

const CustomModal = ({
  open,
  onRequestClose,
  modalBackgroundStyle,
  modalOptionsContainerStyle,
  modalProps,
  children,
}: any) => {
  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={() => onRequestClose()}
      animationType="fade"
      {...modalProps}
    >
      <TouchableOpacity
        onPress={() => onRequestClose()}
        style={[
          styles.modalContainer,
          styles.modalBackgroundStyle,
          modalBackgroundStyle,
        ]}
      >
        {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
        <TouchableWithoutFeedback onPress={() => {}}>
          <SafeAreaView
            style={[styles.modalOptionsContainer, modalOptionsContainerStyle]}
          >
            {children}
          </SafeAreaView>
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
