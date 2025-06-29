import React, { ReactNode } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { extractTextStylesFromArray } from '../../utils';

export interface DropdownSelectedItemProps {
  onPress: () => void;
  style?: (TextStyle | ViewStyle)[];
  label: string | ReactNode;
  removeItemIcon?: ReactNode;
  onRemoveItem?: () => void;
  showRemoveIcon?: boolean;
  disabled: boolean;
  closeIconStyles?: ImageStyle;
  testId?: string;
}

const DropdownSelectedItem = ({
  onPress,
  style,
  label,
  removeItemIcon,
  onRemoveItem,
  showRemoveIcon,
  closeIconStyles,
  testId,
  ...rest
}: DropdownSelectedItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      {...rest}
      style={[styles.dropdownInputContent, ...(style ?? [])]}
      testID={`dropdown-selected-item-${testId}`}
    >
      <Text style={extractTextStylesFromArray(style)}>{label}</Text>

      {showRemoveIcon && (
        <Pressable
          onPress={() => onRemoveItem?.()}
          testID={`dropdown-selected-item-remove-icon-${testId}`}
        >
          {removeItemIcon || (
            <Image
              source={require('../../asset/close.png')}
              style={[styles.removeItemIcon, closeIconStyles]}
            />
          )}
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownInputContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  removeItemIcon: {
    height: 10,
    width: 10,
  },
});

export default DropdownSelectedItem;
