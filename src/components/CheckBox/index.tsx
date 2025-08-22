import React from 'react';
import { Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { colors } from '../../styles/colors';
import { CHECKBOX_SIZE } from '../../constants';
import { CheckboxProps } from './checkbox.types';

const CheckBox = ({
  label,
  value,
  disabled,
  primaryColor,
  checkboxControls,
  onChange,
}: CheckboxProps) => {
  const {
    checkboxSize,
    checkboxComponent,
    checkboxDisabledStyle,
    checkboxStyle,
    checkboxUnselectedColor = 'white',
    checkboxLabelStyle,
  } = checkboxControls ?? {};

  const fillColor = {
    backgroundColor: disabled
      ? checkboxDisabledStyle?.backgroundColor || colors.disabled
      : value
      ? checkboxStyle?.backgroundColor || primaryColor
      : checkboxUnselectedColor,
    borderColor: disabled
      ? checkboxDisabledStyle?.borderColor || colors.disabled
      : checkboxStyle?.borderColor || styles.checkbox.borderColor,
  };
  label = typeof label === 'object' ? label : String(label);

  const checkBoxDimensions = {
    height: checkboxSize || CHECKBOX_SIZE,
    width: checkboxSize || CHECKBOX_SIZE,
  };

  return (
    <Pressable
      onPress={onChange ? () => onChange(!value) : null}
      style={[styles.checkboxContainer]}
      disabled={disabled}
      aria-label={typeof label === 'string' ? label : ''}
    >
      <View
        style={[styles.checkbox, checkboxStyle, fillColor]}
        aria-checked={value}
      >
        {(value && checkboxComponent) || (
          <View style={checkBoxDimensions}>
            {value ? (
              <Image
                source={require('../../asset/check.png')}
                style={checkBoxDimensions}
              />
            ) : null}
          </View>
        )}
      </View>
      {label && label !== '' && (
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
