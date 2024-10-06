import { useState } from 'react';
import { Platform } from 'react-native';
import { TCustomModalControls } from '../types/index.types';

interface UseModalProps {
  resetOptionsRelatedState: () => void;
  disabled?: boolean;
  modalControls?: TCustomModalControls;
}

export const useModal = ({
  resetOptionsRelatedState,
  disabled,
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
      modalControls?.modalProps?.onDismiss?.();
    }
  };

  return {
    isVisible,
    openModal: () => openModal(),
    closeModal: () => closeModal(),
  };
};
