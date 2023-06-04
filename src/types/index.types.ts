import type { ViewStyle, ColorValue, TextStyle } from 'react-native';

export type DropdownProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  onValueChange: Function;
  selectedValue?:
    | string
    | boolean
    | number
    | string[]
    | boolean[]
    | number[]
    | null;
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
  multipleSelectedItemStyle?: ViewStyle;
  modalBackgroundStyle?: ViewStyle;
  modalOptionsContainerStyle?: ViewStyle;
  searchInputStyle?: ViewStyle;
  primaryColor?: ColorValue;
  disabled?: boolean;
  checkboxSize?: number;
  checkboxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  listHeaderComponent?: React.ReactNode;
  listFooterComponent?: React.ReactNode;
  hideModal?: boolean;
};
