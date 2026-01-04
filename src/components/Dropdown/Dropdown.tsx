import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DropdownSelectedItemsContainer, {
  DropdownSelectedItemsContainerProps,
} from './DropdownSelectedItemsContainer';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { TDropdownInputProps } from '../../types/index.types';

const Dropdown = ({
  testID,
  label,
  placeholder,
  helperText,
  error,
  selectionData,
  openModal,
  isMultiple,
  selectedItem,
  selectedItems,
  optionLabel,
  optionValue,
  selectedItemsControls,
  dropdownIcon,
  labelStyle,
  dropdownStyle,
  dropdownIconStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  primaryColor,
  disabled,
  setIndexOfSelectedItem,
  handleMultipleSelections,
}: TDropdownInputProps & DropdownSelectedItemsContainerProps) => {
  return (
    <View
      style={[styles.dropdownInputContainer, dropdownContainerStyle]}
      accessibilityRole="combobox"
      pointerEvents="box-none"
      testID={testID}
    >
      {label && label !== '' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}

      <DropdownSelectedItemsContainer
        placeholder={placeholder}
        error={error}
        selectionData={selectionData}
        openModal={openModal}
        isMultiple={isMultiple}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        optionLabel={optionLabel}
        optionValue={optionValue}
        dropdownStyle={dropdownStyle}
        selectedItemStyle={selectedItemStyle}
        multipleSelectedItemStyle={multipleSelectedItemStyle}
        dropdownErrorStyle={dropdownErrorStyle}
        primaryColor={primaryColor}
        disabled={disabled}
        placeholderStyle={placeholderStyle}
        setIndexOfSelectedItem={setIndexOfSelectedItem}
        handleMultipleSelections={handleMultipleSelections}
        selectedItemsControls={selectedItemsControls}
      />

      {error && error !== '' && (
        <Text style={[styles.error, dropdownErrorTextStyle]}>{error}</Text>
      )}

      {helperText && helperText !== '' && !error && (
        <Text style={[styles.helper, dropdownHelperTextStyle]}>
          {helperText}
        </Text>
      )}

      {/* Trailing Icon */}
      <TouchableOpacity
        style={[styles.iconStyle, dropdownIconStyle]}
        onPress={() => openModal()}
        testID="dropdown-trailing-icon"
      >
        {dropdownIcon || (
          <Image source={require('../../asset/arrow-down.png')} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginBottom: 16, color: colors.gray, ...typography.caption },
  error: { color: colors.red, marginTop: 8, ...typography.caption },
  helper: { marginTop: 8, color: colors.primary, ...typography.caption },
  dropdownInputContainer: { marginBottom: 23, width: '100%' },
  blackText: { color: colors.black },
  iconStyle: { position: 'absolute', right: 25, top: 60 },
});

export default Dropdown;
