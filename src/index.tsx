import React, { useState } from 'react';
import Dropdown from './Dropdown';
import CustomModal from './Modal';
import DropdownList from './DropdownList';
import { DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE } from './constants';
import type { DropdownProps } from './types/index.types';
import { Input } from './Input';
import { colors } from './styles/colors';

export const DropdownSelect = (
  {
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
  }: DropdownProps,
  rest: any
) => {
  const [newOptions, setNewOptions] = useState(options ? options : []);
  const [open, setOpen] = useState(false);
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
        {...rest}
      />
      <CustomModal
        open={open}
        handleToggleModal={handleToggleModal}
        modalBackgroundStyle={modalBackgroundStyle}
        modalOptionsContainer={modalOptionsContainer}
        onRequestClose={() => {}}
      >
        {isSearchable && (
          <Input
            value={searchValue}
            onChangeText={(text: string) => onSearch(text)}
            style={searchInputStyle}
            primaryColor={primary}
          />
        )}
        <DropdownList
          options={newOptions}
          optionLabel={optionLabel}
          optionValue={optionValue}
          isMultiple={isMultiple}
          selectedItems={selectedItems}
          selectedItem={selectedItem}
          handleMultipleSelections={handleMultipleSelections}
          handleSingleSelection={handleSingleSelection}
          primaryColor={primary}
        />
      </CustomModal>
    </>
  );
};

export default DropdownSelect;
