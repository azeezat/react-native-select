import type { ColorValue } from 'react-native';
import { TCheckboxControls, TCheckboxProps } from '../../types/index.types';

export type CheckboxProps = {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  primaryColor?: ColorValue;
  onChange?: (value: boolean | string | number) => void;
} & { checkboxControls?: TCheckboxControls } & TCheckboxProps;
