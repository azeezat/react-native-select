import type {
  ViewStyle,
  ColorValue,
  TextStyle,
  ModalProps,
  TextInputProps,
} from 'react-native';

export type DropdownProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  options: TFlatList | TSectionList;
  optionLabel?: string;
  optionValue?: string;
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
  multipleSelectedItemStyle?: TextStyle;
  modalBackgroundStyle?: ViewStyle;
  modalOptionsContainerStyle?: ViewStyle;
  searchInputStyle?: ViewStyle;
  primaryColor?: ColorValue;
  disabled?: boolean;
  checkboxSize?: number;
  checkboxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  checkboxComponentStyles?: {
    checkboxSize?: number;
    checkboxStyle?: ViewStyle;
    checkboxLabelStyle?: TextStyle;
  };
  checkboxComponent?: React.ReactNode;
  placeholderStyle?: TextStyle;
  listHeaderComponent?: React.ReactNode;
  listFooterComponent?: React.ReactNode;
  hideModal?: boolean;
  modalProps?: ModalProps;
  listComponentStyles?: {
    listEmptyComponentStyle?: TextStyle;
    itemSeparatorStyle?: ViewStyle;
    sectionHeaderStyle?: TextStyle;
  };
  listControls?: {
    selectAllText?: string;
    unselectAllText?: string;
    selectAllCallback?: () => void;
    unselectAllCallback?: () => void;
    hideSelectAll?: boolean;
    emptyListMessage?: string;
  };
  searchControls?: {
    textInputStyle?: ViewStyle | TextStyle;
    textInputContainerStyle?: ViewStyle;
    textInputProps?: TextInputProps;
  };
};

export type TFlatList = TFlatListItem[];
export type TFlatListItem = {
  [key: string]: string | number | boolean;
};

export type TSectionList = TSectionListItem[];
export type TSectionListItem = { title: string; data: TFlatList };
