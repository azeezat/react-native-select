import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownSelectedItemsView from './DropdownSelectedItemsView';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const Dropdown = ({
  label,
  placeholder,
  helperText,
  error,
  getSelectedItemsLabel,
  handleToggleModal,
  isMultiple,
  selectedItem,
  selectedItems,
  labelStyle,
  dropdownStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  primaryColor,
  disabled,
}: any) => {
  return (
    <View style={[styles.dropdownInputContainer, dropdownContainerStyle]}>
      {label && label !== '' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <DropdownSelectedItemsView
        placeholder={placeholder}
        error={error}
        getSelectedItemsLabel={getSelectedItemsLabel}
        handleToggleModal={handleToggleModal}
        isMultiple={isMultiple}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        dropdownStyle={dropdownStyle}
        selectedItemStyle={selectedItemStyle}
        multipleSelectedItemStyle={multipleSelectedItemStyle}
        dropdownErrorStyle={dropdownErrorStyle}
        primaryColor={primaryColor}
        disabled={disabled}
        placeholderStyle={placeholderStyle}
      />

      {error && error !== '' && (
        <Text style={[styles.error, dropdownErrorTextStyle]}>{error}</Text>
      )}

      {helperText && helperText !== '' && !error && (
        <Text style={[styles.helper, dropdownHelperTextStyle]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginBottom: 16, color: colors.gray, ...typography.caption },
  error: { color: colors.red, marginTop: 8, ...typography.caption },
  helper: { marginTop: 8, color: colors.primary, ...typography.caption },
  dropdownInputContainer: { marginBottom: 23, width: '100%' },
  blackText: { color: colors.black },
});

export default Dropdown;
