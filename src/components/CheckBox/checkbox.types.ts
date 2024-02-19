import type { ColorValue } from 'react-native';
import { TCheckboxControls } from 'src/types/index.types';

export type CheckboxProps = {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  primaryColor?: ColorValue;
  onChange?: (value: boolean | string | number) => void;
} & TCheckboxControls;
