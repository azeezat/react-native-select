import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownList from './components/Dropdown/DropdownList';
import CustomModal from './components/CustomModal';
import { Input } from './components/Input';
import CheckBox from './components/CheckBox';
import { colors } from './styles/colors';
import { DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE } from './constants';
import type { DropdownProps } from './types/index.types';

export const DropdownSelect = ({
  placeholder,
  label,
  error,
  helperText,
  options,
  optionLabel,
  optionValue,
  onValueChange,
  selectedValue,
  isMultiple,
  isSearchable,
  labelStyle,
  placeholderStyle,
  dropdownStyle,
  dropdownContainerStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  selectedItemStyle,
  multipleSelectedItemStyle,
  modalBackgroundStyle,
  modalOptionsContainer,
  searchInputStyle,
  primaryColor,
  disabled,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  listHeaderComponent,
  listFooterComponent,
  ...rest
}: DropdownProps) => {
  const [newOptions, setNewOptions] = useState(options ? options : []);
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedValue); //for single selection
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selectedValue)
      ? selectedValue
      : selectedValue === '' || selectedValue === undefined
      ? []
      : [selectedValue]
  ); //for multiple selection
  const [searchValue, setSearchValue] = useState('');

  /*===========================================
   * Selection handlers
   *==========================================*/
  const handleSingleSelection = (value: any) => {
    if (selectedItem === value) {
      setSelectedItem(null);
    } else {
      setSelectedItem(value);
      onValueChange(value); //send value to parent
      setOpen(false); //close modal upon selection
    }
  };

  const handleMultipleSelections = (value: any) => {
    let selectedValues = [...selectedItems];

    if (selectedValues.includes(value)) {
      selectedValues = selectedValues.filter((item) => item !== value);
    } else {
      selectedValues.push(value);
    }
    setSelectedItems(selectedValues);
    onValueChange(selectedValues); //send value to parent

    if (
      options.filter((item) => !item.disabled).length === selectedValues.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    setSelectAll((prevVal) => {
      const selectedValues = [];
      const filteredOptions = newOptions.filter((item) => !item.disabled); //don't select disabled items
      if (!prevVal) {
        for (let i = 0; i < filteredOptions.length; i++) {
          selectedValues.push(filteredOptions[i][optionValue]);
        }
      }

      setSelectedItems(selectedValues);
      onValueChange(selectedValues); //send value to parent
      return !prevVal;
    });
  };

  /*===========================================
   * Get label handler
   *==========================================*/
  const getSelectedItemsLabel = () => {
    if (isMultiple) {
      let selectedLabels: Array<string> = [];
      selectedItems &&
        selectedItems.forEach((element) => {
          let selectedItemLabel =
            options &&
            options.find(
              (item: any) =>
                item[optionValue ?? DEFAULT_OPTION_VALUE] === element
            )?.[optionLabel];
          selectedLabels.push(selectedItemLabel);
        });
      return selectedLabels;
    }

    let selectedItemLabel =
      options &&
      options.find(
        (item: any) =>
          item[optionValue ?? DEFAULT_OPTION_VALUE] === selectedItem
      );
    return selectedItemLabel?.[optionLabel ?? DEFAULT_OPTION_LABEL];
  };

  /*===========================================
   * Search
   *==========================================*/
  const onSearch = (value: string) => {
    setSearchValue(value);

    let searchText = value.toString().toLocaleLowerCase().trim();

    const regexFilter = new RegExp(searchText, 'i');

    const searchResults = options.filter((item: any) => {
      if (
        item[optionLabel ?? DEFAULT_OPTION_LABEL]
          .toString()
          .toLowerCase()
          .search(regexFilter) !== -1 ||
        item[optionValue ?? DEFAULT_OPTION_VALUE]
          .toString(regexFilter)
          .toLowerCase()
          .search(regexFilter) !== -1
      ) {
        return item;
      }
    });

    setNewOptions(searchResults);
  };

  /*===========================================
   * Modal
   *==========================================*/
  const handleToggleModal = () => {
    setOpen(!open);
    setSearchValue('');
    setNewOptions(options);
  };

  let primary = primaryColor || colors.gray;
  return (
    <>
      <Dropdown
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        getSelectedItemsLabel={getSelectedItemsLabel}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        handleToggleModal={handleToggleModal}
        labelStyle={labelStyle}
        dropdownStyle={dropdownStyle}
        dropdownContainerStyle={dropdownContainerStyle}
        dropdownErrorStyle={dropdownErrorStyle}
        dropdownErrorTextStyle={dropdownErrorTextStyle}
        dropdownHelperTextStyle={dropdownHelperTextStyle}
        selectedItemStyle={selectedItemStyle}
        multipleSelectedItemStyle={multipleSelectedItemStyle}
        isMultiple={isMultiple}
        primaryColor={primary}
        disabled={disabled}
        placeholderStyle={placeholderStyle}
        {...rest}
      />
      <CustomModal
        open={open}
        handleToggleModal={handleToggleModal}
        modalBackgroundStyle={modalBackgroundStyle}
        modalOptionsContainer={modalOptionsContainer}
        onRequestClose={() => {}}
      >
        <DropdownList
          ListHeaderComponent={
            <>
              {isSearchable && (
                <Input
                  value={searchValue}
                  onChangeText={(text: string) => onSearch(text)}
                  style={searchInputStyle}
                  primaryColor={primary}
                />
              )}
              {listHeaderComponent}
              {isMultiple && newOptions.length > 1 && (
                <View style={styles.optionsContainerStyle}>
                  <TouchableOpacity onPress={() => {}}>
                    <CheckBox
                      value={selectAll}
                      label={selectAll ? 'Clear all' : 'Select all'}
                      onChange={() => handleSelectAll()}
                      primaryColor={primary}
                      checkboxSize={checkboxSize}
                      checkboxStyle={checkboxStyle}
                      checkboxLabelStyle={checkboxLabelStyle}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          }
          ListFooterComponent={listFooterComponent}
          options={newOptions}
          optionLabel={optionLabel}
          optionValue={optionValue}
          isMultiple={isMultiple}
          isSearchable={isSearchable}
          selectedItems={selectedItems}
          selectedItem={selectedItem}
          handleMultipleSelections={handleMultipleSelections}
          handleSingleSelection={handleSingleSelection}
          primaryColor={primary}
          checkboxSize={checkboxSize}
          checkboxStyle={checkboxStyle}
          checkboxLabelStyle={checkboxLabelStyle}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  optionsContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
});

export default DropdownSelect;
