interface UseModalProps {
  resetOptionsRelatedState: () => void;
  disabled?: boolean;
  modalRef: any;
}

export const useModal = ({
  resetOptionsRelatedState,
  disabled,
  modalRef,
}: UseModalProps) => {
  const openModal = () => {
    if (disabled) {
      return;
    }
    modalRef.current?.open();
    resetOptionsRelatedState();
  };

  const closeModal = () => {
    modalRef.current?.close();
    resetOptionsRelatedState();
  };

  return {
    openModal,
    closeModal,
  };
};
