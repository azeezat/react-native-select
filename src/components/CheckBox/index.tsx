/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { colors } from '../../styles/colors';
import { CHECKBOX_SIZE } from '../../constants';
import type { CheckboxProps } from './types';

/**
 *
 *`checkboxSize`, `checkboxStyle`,`checkboxLabelStyle` Will be deleted in version 1.0.
 * and replaced with `checkboxComponentStyles`
 */

const CheckBox = ({
  label,
  value,
  disabled,
  primaryColor,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  checkboxComponentStyles,
  onChange,
}: CheckboxProps) => {
  // const { checkboxSize, checkboxStyle, checkboxLabelStyle } =
  //   checkboxComponentStyles;
  const fillColor = {
    backgroundColor: disabled
      ? '#d3d3d3'
      : value
      ? checkboxComponentStyles?.checkboxStyle?.backgroundColor ||
        checkboxStyle?.backgroundColor ||
        primaryColor ||
        'green'
      : 'white',
    borderColor: disabled
      ? colors.disabled
      : checkboxComponentStyles?.checkboxStyle?.borderColor ||
        checkboxStyle?.borderColor ||
        styles.checkbox.borderColor,
  };

  return (
    <Pressable
      onPress={onChange ? () => onChange(!value) : null}
      style={[styles.checkboxContainer]}
      disabled={disabled}
    >
      <View style={[styles.checkbox, checkboxStyle, fillColor]}>
        <Image
          source={require('../../asset/check.png')}
          style={[
            {
              height:
                checkboxComponentStyles?.checkboxSize ||
                checkboxSize ||
                CHECKBOX_SIZE,
              width:
                checkboxComponentStyles?.checkboxSize ||
                checkboxSize ||
                CHECKBOX_SIZE,
            },
          ]}
        />
      </View>
      {label && (
        <Text
          style={[
            checkboxComponentStyles?.checkboxLabelStyle || checkboxLabelStyle,
            styles.labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  checkbox: {
    padding: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: 'black',
  },
  labelStyle: { marginLeft: 10 },
});

export default CheckBox;
