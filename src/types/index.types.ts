import type { CSSProperties } from 'react';

export type DropdownProps = {
  placeholder: string;
  label: string;
  error: string;
  helperText: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  onValueChange: Function;
  selectedValue: string | any[] | null;
  isMultiple: boolean;
  isSearchable: boolean;
  labelStyle: string;
  dropdownStyle: CSSProperties;
  dropdownContainerStyle: CSSProperties;
  selectedItemStyle: CSSProperties;
  multipleSelectedItemStyle: CSSProperties;
  modalBackgroundStyle: CSSProperties;
  modalOptionsContainer: CSSProperties;
  searchInputStyle: CSSProperties;
  primaryColor: string;
  disabled: boolean;
};
