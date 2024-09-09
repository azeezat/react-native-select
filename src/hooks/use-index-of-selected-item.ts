import { useState, useCallback } from 'react';
import type { TFlatListItem, TSectionListItem } from '../types/index.types';

interface UseIndexOfSelectedItemProps {
  options: (TFlatListItem | TSectionListItem)[];
  optionLabel: string;
  isSectionList: boolean;
}

/**
 *
 * @description for scrollToIndex in Sectionlist and Flatlist
 */

export const useIndexOfSelectedItem = ({
  options,
  optionLabel,
  isSectionList,
}: UseIndexOfSelectedItemProps) => {
  const [listIndex, setListIndex] = useState<{
    sectionIndex?: number;
    itemIndex: number;
  }>({ itemIndex: -1, sectionIndex: -1 });

  const setIndexOfSelectedItem = useCallback(
    (selectedLabel: string) => {
      if (isSectionList) {
        (options as TSectionListItem[]).forEach((section, sectionIndex) => {
          const itemIndex = section.data.findIndex(
            (item) => item[optionLabel] === selectedLabel
          );
          if (itemIndex !== -1) {
            setListIndex({ sectionIndex, itemIndex });
          }
        });
      } else {
        const itemIndex = (options as TFlatListItem[]).findIndex(
          (item) => item[optionLabel] === selectedLabel
        );
        if (itemIndex !== -1) {
          setListIndex({ itemIndex });
        }
      }
    },
    [options, optionLabel, isSectionList]
  );

  return { listIndex, setListIndex, setIndexOfSelectedItem };
};
