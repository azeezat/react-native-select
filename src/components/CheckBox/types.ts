import type { ColorValue, ViewStyle, TextStyle } from 'react-native';

export type CheckboxProps = {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  primaryColor?: ColorValue;
  checkboxSize?: number;
  checkboxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  onChange?: (value: boolean | string | number) => void;
};
