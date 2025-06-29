import React from 'react';
import type {
  ViewStyle,
  ColorValue,
  TextStyle,
  ModalProps,
  TextInputProps,
} from 'react-native';

export type DropdownProps = CommonDropdownProps &
  TDropdownInputProps &
  TControls &
  TListProps;

export type CommonDropdownProps = {
  options: TFlatList | TSectionList;
  onValueChange: (selectedItems: TSelectedItem | TSelectedItem[]) => void;
  selectedValue: TSelectedItem | TSelectedItem[];
  optionLabel?: string;
  optionValue?: string;
  autoCloseOnSelect?: boolean;
  minSelectableItems?: number;
  maxSelectableItems?: number;
};

export type TDropdownInputProps = {
  testID?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  isMultiple?: boolean;
  isSearchable?: boolean;
  dropdownIcon?: React.ReactNode;
  labelStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
  dropdownIconStyle?: ViewStyle;
  dropdownContainerStyle?: ViewStyle;
  dropdownErrorStyle?: ViewStyle;
  dropdownErrorTextStyle?: TextStyle;
  dropdownHelperTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle | ViewStyle;
  multipleSelectedItemStyle?: TextStyle | ViewStyle;
  primaryColor?: ColorValue;
  disabled?: boolean;
  placeholderStyle?: TextStyle;
};

type TControls = {
  searchControls?: TSearchControls;
  checkboxControls?: TCheckboxControls;
  modalControls?: TCustomModalControls;
  listControls?: TListControls;
  selectedItemsControls?: TSelectedItemsControls;
};

type TSearchControls = {
  textInputStyle?: ViewStyle | TextStyle;
  textInputContainerStyle?: ViewStyle;
  textInputProps?: TextInputProps;
  searchCallback?: (value: string) => void;
};

export type TCheckboxControls = {
  checkboxSize?: number;
  checkboxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  checkboxComponent?: React.ReactNode;
  checkboxDisabledStyle?: ViewStyle;
  checkboxUnselectedColor?: ColorValue;
};

export type TCustomModalControls = {
  modalBackgroundStyle?: ViewStyle;
  modalOptionsContainerStyle?: ViewStyle;
  modalProps?: ModalProps;
};

export type TListProps = {
  listHeaderComponent?: React.ReactNode;
  listFooterComponent?: React.ReactNode;
  listComponentStyles?: {
    listEmptyComponentStyle?: TextStyle;
    itemSeparatorStyle?: ViewStyle;
    sectionHeaderStyle?: TextStyle;
  };
  listEmptyComponent?: React.ReactNode;
};

type TListControls = {
  selectAllText?: string;
  unselectAllText?: string;
  selectAllCallback?: () => void;
  unselectAllCallback?: () => void;
  hideSelectAll?: boolean;
  emptyListMessage?: string;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
};

export type TSelectedItemsControls = {
  showRemoveIcon?: boolean;
  removeItemIcon?: React.ReactNode;
  onRemoveItem?: () => void;
};

export type TSelectedItem = string | number | boolean | undefined;
export type TSelectedItemWithReactComponent =
  | TSelectedItem
  | React.ReactElement;

export type TFlatList = TFlatListItem[];
export type TFlatListItem = {
  [key: string]: TSelectedItemWithReactComponent;
};

export type TSectionList = TSectionListItem[];
export type TSectionListItem = { title: string; data: TFlatList };

export interface DropdownSelectHandle {
  open: () => void;
  close: () => void;
}
