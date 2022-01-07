import React, { useState } from 'react';
import Dropdown from './Dropdown';
import CustomModal from './Modal';
import DropdownList from './DropdownList';
import { DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE } from './constants';
import { Input } from './Input';

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
  dropdownStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  modalBackgroundStyle,
  modalOptionsContainer,
  searchInputStyle,
  primaryColor,
}: any) => {
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
              (item: string) =>
                item[optionValue ?? DEFAULT_OPTION_VALUE] === element
            )?.[optionLabel];
          selectedLabels.push(selectedItemLabel);
        });
      return selectedLabels;
    }

    let selectedItemLabel =
      options &&
      options.find(
        (item: string) =>
          item[optionValue ?? DEFAULT_OPTION_VALUE] === selectedItem
      );
    return selectedItemLabel?.[optionLabel ?? DEFAULT_OPTION_LABEL];
  };

  /*===========================================
   * Search
   *==========================================*/
  const onSearch = (value: string) => {
    setSearchValue(value);
    let searchTerm = value.toString().toLocaleLowerCase();
    const searchResults = options.filter((item: any) => {
      return (
        item[optionLabel ?? DEFAULT_OPTION_LABEL]
          .toString()
          .toLowerCase()
          .includes(searchTerm) ||
        item[optionValue ?? DEFAULT_OPTION_VALUE]
          .toString(searchTerm)
          .toLowerCase()
          .includes()
      );
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
        selectedItemStyle={selectedItemStyle}
        isMultiple={isMultiple}
        primaryColor={primaryColor}
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
          primaryColor={primaryColor}
        />
      </CustomModal>
    </>
  );
};

export default DropdownSelect;
