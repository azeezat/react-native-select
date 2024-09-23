import { useState } from 'react';
import { ModalProps, Platform } from 'react-native';
import { TCustomModalControls } from '../types/index.types';

interface UseModalProps {
  resetOptionsRelatedState: () => void;
  disabled?: boolean;
  modalProps?: ModalProps;
  modalControls?: TCustomModalControls;
}

export const useModal = ({
  resetOptionsRelatedState,
  disabled,
  modalProps,
  modalControls,
}: UseModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    if (disabled) return;
    setIsVisible(true);
    resetOptionsRelatedState();
  };

  const closeModal = () => {
    setIsVisible(false);
    resetOptionsRelatedState();

    // iOS supports the onDismiss prop but android does not, so we do this explicitly here
    // https://reactnative.dev/docs/modal#ondismiss-ios
    if (Platform.OS === 'android') {
      modalControls?.modalProps?.closeModal?.(); //kept for backwards compatibility
      modalProps?.onDismiss?.(); //kept for backwards compatibility
      modalControls?.modalProps?.onDismiss?.();
    }
  };

  return {
    isVisible,
    openModal: () => openModal(),
    closeModal: () => closeModal(),
  };
};
