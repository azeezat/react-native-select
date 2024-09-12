import { useState, useCallback } from 'react';
import { TSelectedItem } from '../types/index.types';

interface UseSelectionHandlerProps {
  initialSelectedValue: TSelectedItem | TSelectedItem[]; // Can be a single value or an array
  isMultiple: boolean;
  maxSelectableItems?: number;
  onValueChange: (selectedItems: TSelectedItem | TSelectedItem[]) => void;
  closeModal: () => void;
  autoCloseOnSelect: boolean;
}

export const useSelectionHandler = ({
  initialSelectedValue,
  isMultiple,
  maxSelectableItems,
  onValueChange,
  closeModal,
  autoCloseOnSelect,
}: UseSelectionHandlerProps) => {
  // Initialize state based on whether it's multiple selection or not
  const [selectedItem, setSelectedItem] = useState<TSelectedItem>(
    isMultiple ? '' : (initialSelectedValue as TSelectedItem)
  );
  const [selectedItems, setSelectedItems] = useState<TSelectedItem[]>(
    isMultiple ? (initialSelectedValue as TSelectedItem[]) : []
  );

  const handleSingleSelection = useCallback(
    (value: TSelectedItem) => {
      if (selectedItem === value) {
        setSelectedItem('');
        onValueChange(''); // Send null to parent when deselected
      } else {
        setSelectedItem(value);
        onValueChange(value); // Send selected value to parent

        if (autoCloseOnSelect) {
          closeModal(); // close modal upon selection
        }
      }
    },
    [selectedItem, onValueChange, autoCloseOnSelect, closeModal]
  );

  const handleMultipleSelections = useCallback(
    (value: TSelectedItem) => {
      setSelectedItems((prevVal) => {
        let selectedValues = [...prevVal];

        if (selectedValues.includes(value)) {
          // Remove item
          selectedValues = selectedValues.filter((item) => item !== value);
        } else {
          // Add item
          if (
            maxSelectableItems &&
            selectedValues.length >= maxSelectableItems
          ) {
            return selectedValues;
          }
          selectedValues.push(value);
        }

        onValueChange(selectedValues); // Send selected values to parent
        return selectedValues;
      });
    },
    [maxSelectableItems, onValueChange]
  );

  // Return the relevant state and handlers
  return {
    selectedItem,
    selectedItems,
    handleSingleSelection,
    handleMultipleSelections,
    setSelectedItems, // Expose for potential manual control
    setSelectedItem, // Expose for potential manual control
  };
};
