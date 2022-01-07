import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { colors } from './styles/colors';

const DropdownListItem = ({
  item,
  optionLabel,
  optionValue,
  isMultiple,
  selectedOption,
  onChange,
  primaryColor,
}: any) => {
  const selectedOptionValue = optionValue ?? 'value';
  return (
    <TouchableOpacity
      style={styles.modalOptions}
      onPress={() => onChange(item[selectedOptionValue])}
    >
      <View style={styles.spacing}>
        <CheckBox
          value={
            isMultiple
              ? selectedOption.includes(item[selectedOptionValue])
              : [selectedOption].includes(item[selectedOptionValue])
          }
          onChange={() => onChange(item[selectedOptionValue])}
          boxType="circle" //works on ios only
          tintColors={{ true: primaryColor || colors.primary }} //android control
          onCheckColor={primaryColor || colors.primary} //ios checkmark colour control
          onTintColor={primaryColor || colors.primary} //ios box colour control
        />
      </View>
      <View>
        <Text>{item[optionLabel ?? 'label']}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  spacing: { marginRight: 10 },
  modalOptions: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(DropdownListItem);
