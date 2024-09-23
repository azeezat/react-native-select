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
  TSearchProps &
  TCheckboxProps &
  TCustomModalProps &
  TListProps &
  TControls;

export type CommonDropdownProps = {
  testID?: string;
  label?: string;
  options: TFlatList | TSectionList;
  optionLabel?: string;
  optionValue?: string;
  onValueChange: (selectedItems: TSelectedItem | TSelectedItem[]) => void;
  selectedValue: TSelectedItem | TSelectedItem[];
  autoCloseOnSelect?: boolean;
  maxSelectableItems?: number;
};

export type TDropdownInputProps = {
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
  selectedItemStyle?: TextStyle;
  multipleSelectedItemStyle?: TextStyle;
  primaryColor?: ColorValue;
  disabled?: boolean;
  placeholderStyle?: TextStyle;
  /** @deprecated Use useRef to access the open and close props.*/
  hideModal?: boolean;
};

type TControls = {
  searchControls?: TSearchControls;
  checkboxControls?: TCheckboxControls;
  modalControls?: TCustomModalControls;
  listControls?: TListControls;
};

export type TSearchProps = {
  /** @deprecated Use `searchControls = {{textInputStyle: ViewStyle | TextStyle }}` instead.*/
  searchInputStyle?: ViewStyle;
};

type TSearchControls = {
  textInputStyle?: ViewStyle | TextStyle;
  textInputContainerStyle?: ViewStyle;
  textInputProps?: TextInputProps;
  searchCallback?: (value: string) => void;
};

export type TCheckboxProps = {
  /** @deprecated Use `checkboxControls = {{checkboxSize: number }}` instead.*/
  checkboxSize?: number;
  /** @deprecated Use `checkboxControls = {{checkboxStyle: ViewStyle }}` instead.*/
  checkboxStyle?: ViewStyle;
  /** @deprecated Use `checkboxControls = {{checkboxLabelStyle: TextStyle }}` instead.*/
  checkboxLabelStyle?: TextStyle;
  /** @deprecated Use `checkboxControls` instead.*/
  checkboxComponentStyles?: {
    checkboxSize?: number;
    checkboxStyle?: ViewStyle;
    checkboxLabelStyle?: TextStyle;
  };
  /** @deprecated Use `checkboxControls = {{checkboxComponent: <View></View> }}` instead.*/
  checkboxComponent?: React.ReactNode;
};

export type TCheckboxControls = {
  checkboxSize?: number;
  checkboxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  checkboxComponent?: React.ReactNode;
  checkboxDisabledStyle?: ViewStyle;
  checkboxUnselectedColor?: ColorValue;
};

export type TCustomModalProps = {
  /** @deprecated Use `modalControls = {{modalBackgroundStyle: ViewStyle}} instead.*/
  modalBackgroundStyle?: ViewStyle;
  /** @deprecated Use `modalControls = {{ modalOptionsContainerStyle: ViewStyle}} instead.*/
  modalOptionsContainerStyle?: ViewStyle;
  /** @deprecated Use `modalControls = {{modalProps: ModalProps }}` instead.*/
  modalProps?: ModalProps & {
    /** @deprecated Use `onDismiss` instead.*/
    closeModal?: () => void;
  };
};

export type TCustomModalControls = {
  modalBackgroundStyle?: ViewStyle;
  modalOptionsContainerStyle?: ViewStyle;
  modalProps?: ModalProps & {
    /** @deprecated Use `onDismiss` instead.*/
    closeModal?: () => void;
  };
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
};

export type TSelectedItem = string | number | boolean;
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
