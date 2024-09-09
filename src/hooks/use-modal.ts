import { useState, useCallback, useEffect } from 'react';
import { ModalProps, Platform } from 'react-native';

interface UseModalProps {
  hideModal: boolean;
  modalProps?: ModalProps;
  onDismiss?: () => void;
  resetOptionsRelatedState: () => void;
  disabled?: boolean;
}

export const useModal = ({
  hideModal,
  onDismiss,
  resetOptionsRelatedState,
  disabled,
}: UseModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (hideModal) {
      setOpen(false);
    }
  }, [hideModal]);

  useEffect(() => {
    if (!open && Platform.OS === 'android') {
      onDismiss?.();
    }
  }, [open, onDismiss]);

  const openModal = useCallback(() => {
    if (disabled) {
      return;
    }
    setOpen(true);
    resetOptionsRelatedState();
  }, [disabled, setOpen, resetOptionsRelatedState]);

  const closeModal = useCallback(() => {
    setOpen(false);
    resetOptionsRelatedState();
  }, [setOpen, resetOptionsRelatedState]);

  return {
    open,
    setOpen,
    openModal,
    closeModal,
  };
};
