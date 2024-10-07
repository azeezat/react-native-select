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
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  checkboxComponentStyles,
  checkboxComponent,
  checkboxControls,
  onChange,
}: CheckboxProps) => {
  const fillColor = {
    backgroundColor: disabled
      ? checkboxControls?.checkboxDisabledStyle?.backgroundColor ||
        colors.disabled
      : value
      ? checkboxControls?.checkboxStyle?.backgroundColor ||
        checkboxComponentStyles?.checkboxStyle?.backgroundColor ||
        checkboxStyle?.backgroundColor ||
        primaryColor
      : checkboxControls?.checkboxUnselectedColor || 'white',
    borderColor: disabled
      ? checkboxControls?.checkboxDisabledStyle?.borderColor || colors.disabled
      : checkboxControls?.checkboxStyle?.borderColor ||
        checkboxComponentStyles?.checkboxStyle?.borderColor ||
        checkboxStyle?.borderColor ||
        styles.checkbox.borderColor,
  };
  label = String(label);
  return (
    <Pressable
      onPress={onChange ? () => onChange(!value) : null}
      style={[styles.checkboxContainer]}
      disabled={disabled}
      aria-label={typeof label === 'string' ? label : ''}
    >
      <View
        style={[
          styles.checkbox,
          checkboxControls?.checkboxStyle ||
            checkboxComponentStyles?.checkboxStyle ||
            checkboxStyle,
          fillColor,
        ]}
        aria-checked={value}
      >
        {checkboxControls?.checkboxComponent || checkboxComponent || (
          <Image
            source={require('../../asset/check.png')}
            style={[
              {
                height:
                  checkboxControls?.checkboxSize ||
                  checkboxComponentStyles?.checkboxSize ||
                  checkboxSize ||
                  CHECKBOX_SIZE,
                width:
                  checkboxControls?.checkboxSize ||
                  checkboxComponentStyles?.checkboxSize ||
                  checkboxSize ||
                  CHECKBOX_SIZE,
              },
            ]}
          />
        )}
      </View>
      {label && label !== '' && (
        <Text
          style={[
            checkboxControls?.checkboxLabelStyle ||
              checkboxComponentStyles?.checkboxLabelStyle ||
              checkboxLabelStyle,
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
