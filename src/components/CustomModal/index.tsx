import React from 'react';
import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';

const CustomModal = ({
  open,
  handleToggleModal,
  onRequestClose,
  modalBackgroundStyle,
  modalOptionsContainerStyle,
  children,
}: any) => {
  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={() => onRequestClose()}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={() => handleToggleModal()}
        style={[
          styles.modalContainer,
          styles.modalBackgroundStyle,
          modalBackgroundStyle,
        ]}
      >
        <SafeAreaView
          style={[styles.modalOptionsContainer, modalOptionsContainerStyle]}
        >
          {children}
        </SafeAreaView>
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
  },
});

export default CustomModal;
