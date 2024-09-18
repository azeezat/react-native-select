import { useState } from 'react';
import { ModalProps } from 'react-native';
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
    modalControls?.modalProps?.closeModal?.(); //kept for backwards compatibility
    modalProps?.onDismiss?.(); //kept for backwards compatibility
    modalControls?.modalProps?.onDismiss?.();
  };

  return {
    isVisible,
    openModal: () => openModal(),
    closeModal: () => closeModal(),
  };
};
