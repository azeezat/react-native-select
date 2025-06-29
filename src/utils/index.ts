import { TextStyle, ViewStyle } from 'react-native';
import { TSelectedItem } from '../types/index.types';
import { TFlatList, TFlatListItem, TSectionList } from '../types/index.types';

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
 * @description get the labels of the items that were selected from the options array for either multiple or single selections
 * @returns
 */
export const getSelectionsData = ({
  isMultiple,
  optionValue,
  selectedItem,
  selectedItems,
  modifiedOptions,
}: {
  isMultiple: boolean;
  optionValue: string;
  selectedItem: TSelectedItem;
  selectedItems: TSelectedItem[];
  modifiedOptions: TFlatList;
}): TFlatListItem | TFlatListItem[] => {
  // Multiple select
  if (isMultiple) {
    let currentSelections: TFlatListItem[] = [];

    Array.isArray(selectedItems) &&
      selectedItems.forEach((element: TSelectedItem) => {
        const currentSelection = modifiedOptions?.find(
          (item: TFlatListItem) => item[optionValue] === element
        );

        // Only push if currentSelection is defined and is of the correct type
        if (currentSelection) {
          currentSelections.push(currentSelection);
        }
      });

    return currentSelections;
  }

  // Single select
  let current = modifiedOptions?.find(
    (item: TFlatListItem) => item[optionValue] === selectedItem
  );
  return current ? current : {};
};

const textStyleKeys = [
  'color',
  'fontSize',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'textAlign',
  'lineHeight',
  'textDecorationLine',
  'textDecorationStyle',
  'textDecorationColor',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'letterSpacing',
  'textTransform',
];

export const extractTextStylesFromArray = (
  styleArray: (ViewStyle & TextStyle)[] = []
) => {
  const extractedStyles: Record<string, any> = {};
  for (const styleObject of styleArray) {
    if (styleObject && typeof styleObject === 'object') {
      // Ensure it's a valid style object
      for (const prop in styleObject) {
        if (textStyleKeys.includes(prop)) {
          extractedStyles[prop] = (styleObject as Record<string, any>)[prop];
        }
      }
    }
  }
  return extractedStyles;
};
