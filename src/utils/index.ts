import { TSelectedItem } from '../types/index.types';
import {
  TFlatList,
  TFlatListItem,
  TSectionList,
  TSelectedItemWithReactComponent,
} from '../types/index.types';

export const extractPropertyFromArray = (arr: any[], property: string) => {
  let extractedValue = arr?.map((item: any) => item[property]);

  return extractedValue;
};

export const escapeRegExp = (text: string) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const removeDisabledItems = (items: TFlatList) => {
  return items?.filter((item: TFlatListItem) => !item.disabled);
};

export const isSectionList = (options: TFlatList | TSectionList): boolean => {
  return (options as TSectionList).some(
    (item) => item.title && item.data && Array.isArray(item.data)
  );
};

/**
 *
 * @description get the labels of the items that were selected from the options array
 * @returns
 */
export const getSelectedItemsLabel = ({
  isMultiple,
  optionLabel,
  optionValue,
  selectedItem,
  selectedItems,
  modifiedOptions,
}: {
  isMultiple: boolean;
  optionLabel: string;
  optionValue: string;
  selectedItem: TSelectedItem;
  selectedItems: TSelectedItem[];
  modifiedOptions: TFlatList;
}) => {
  // Multiple select
  if (isMultiple && Array.isArray(selectedItems)) {
    let selectedLabels: TSelectedItemWithReactComponent[] = [];

    selectedItems?.forEach((element: TSelectedItem) => {
      let selectedItemLabel = modifiedOptions?.find(
        (item: TFlatListItem) => item[optionValue] === element
      )?.[optionLabel];

      if (selectedItemLabel) {
        selectedLabels.push(selectedItemLabel);
      }
    });
    return selectedLabels;
  }

  // Single select
  let selectedItemLabel = modifiedOptions?.find(
    (item: TFlatListItem) => item[optionValue] === selectedItem
  );
  return selectedItemLabel?.[optionLabel];
};
