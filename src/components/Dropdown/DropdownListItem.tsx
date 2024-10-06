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
  checkboxControls,
}: any) => {
  return (
    <TouchableOpacity
      style={styles.listItemContainerStyle}
      onPress={item.disabled ? () => {} : () => onChange(item[optionValue])}
    >
      <CheckBox
        value={
          isMultiple
            ? selectedOption.includes(item[optionValue])
            : [selectedOption].includes(item[optionValue])
        }
        label={item[optionLabel]}
        onChange={() => onChange(item[optionValue])}
        primaryColor={primaryColor}
        checkboxControls={checkboxControls}
        disabled={item.disabled}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(DropdownListItem);
