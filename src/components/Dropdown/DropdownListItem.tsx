import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '../CheckBox';

const DropdownListItem = ({
  item,
  optionLabel,
  optionValue,
  isMultiple,
  selectedOption,
  onChange,
  primaryColor,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
}: any) => {
  const selectedOptionValue = optionValue ?? 'value';
  return (
    <TouchableOpacity
      style={styles.dropdownModalOptions}
      onPress={
        item.disabled ? () => {} : () => onChange(item[selectedOptionValue]) // intentionally didn't use the disable property
      }
    >
      <CheckBox
        value={
          isMultiple
            ? selectedOption.includes(item[selectedOptionValue])
            : [selectedOption].includes(item[selectedOptionValue])
        }
        label={item[optionLabel ?? '']}
        onChange={() => onChange(item[selectedOptionValue])}
        primaryColor={primaryColor}
        checkboxSize={checkboxSize}
        checkboxStyle={checkboxStyle}
        checkboxLabelStyle={checkboxLabelStyle}
        disabled={item.disabled}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownModalOptions: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(DropdownListItem);
