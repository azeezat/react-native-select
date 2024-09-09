import { useCallback, useEffect, useState } from 'react';
import { TFlatListItem, TSelectedItem } from '../types/index.types';
import { removeDisabledItems } from '../utils';

interface UseCheckSelectAllProps {
  options: TFlatListItem[];
  selectedItems: TSelectedItem[];
  isMultiple: boolean;
  onValueChange: (selectedValues: TSelectedItem[]) => void;
  listControls?: {
    selectAllCallback?: () => void;
    unselectAllCallback?: () => void;
  };
  optionValue: string;
}

export const useSelectAll = ({
  options,
  selectedItems,
  isMultiple,
  onValueChange,
  listControls,
  optionValue,
}: UseCheckSelectAllProps) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  /**
   * @description Handle "Select All" logic
   */
  const handleSelectAll = useCallback(() => {
    setSelectAll((prevVal) => {
      let selectedValues: TSelectedItem[] = [];

      // Remove disabled items from selection
      const filteredOptions = removeDisabledItems(options);

      // if everything has not been selected, select all the values in the list
      if (!prevVal) {
        selectedValues = filteredOptions.map(
          (obj) => obj[optionValue]
        ) as TSelectedItem[];
      }

      onValueChange(selectedValues); // Send selected values to parent
      return !prevVal;
    });

    if (typeof listControls?.selectAllCallback === 'function' && !selectAll) {
      listControls.selectAllCallback();
    }

    if (typeof listControls?.unselectAllCallback === 'function' && selectAll) {
      listControls.unselectAllCallback();
    }
  }, [options, optionValue, listControls, selectAll, onValueChange]);

  /**
   * Check if all items are selected
   */
  const checkSelectAll = useCallback(() => {
    if (removeDisabledItems(options)?.length === selectedItems?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [options, selectedItems]);

  /**
   * if the user decides to select the options one by one, this hook
   * runs to check if everything has been selected so that the `selectAll checkbox` can be selected
   */
  useEffect(() => {
    if (isMultiple) {
      checkSelectAll();
    }
  }, [checkSelectAll, isMultiple, selectedItems]);

  return { selectAll, handleSelectAll };
};
