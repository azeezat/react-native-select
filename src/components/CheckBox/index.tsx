/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { CHECKBOX_SIZE } from '../../constants';
import type { CheckboxProps } from './types';

const CheckBox = ({
  label,
  value,
  primaryColor,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  onChange,
}: CheckboxProps) => {
  const fillColor = {
    backgroundColor: value ? primaryColor || 'green' : 'white',
  };
  return (
    <Pressable
      onPress={onChange ? () => onChange(!value) : () => {}}
      style={[styles.checkboxContainer]}
    >
      <View style={[styles.checkbox, checkboxStyle, fillColor]}>
        <Image
          source={require('../../asset/check.png')}
          style={[
            {
              height: checkboxSize || CHECKBOX_SIZE,
              width: checkboxSize || CHECKBOX_SIZE,
            },
          ]}
        />
      </View>
      {label && (
        <Text style={[checkboxLabelStyle, styles.labelStyle]}>{label}</Text>
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
