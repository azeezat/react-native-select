import React, { useState } from 'react';
import Dropdown from './Dropdown';
import CustomModal from './Modal';
import DropdownList from './DropdownList';

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
  labelStyle,
  dropdownStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  modalBackgroundStyle,
  modalOptionsContainer,
}: any) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedValue); //for single selection
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selectedValue) ? selectedValue : []
  ); //for multiple selection

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
              (item: string) => item[optionValue ?? 'value'] === element
            )?.[optionLabel];
          selectedLabels.push(selectedItemLabel);
        });
      return selectedLabels;
    }

    let selectedItemLabel =
      options &&
      options.find(
        (item: string) => item[optionValue ?? 'value'] === selectedItem
      );
    return selectedItemLabel?.[optionLabel];
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
        setOpen={setOpen}
        open={open}
        labelStyle={labelStyle}
        dropdownStyle={dropdownStyle}
        dropdownContainerStyle={dropdownContainerStyle}
        selectedItemStyle={selectedItemStyle}
        isMultiple={isMultiple}
      />
      <CustomModal
        open={open}
        setOpen={setOpen}
        modalBackgroundStyle={modalBackgroundStyle}
        modalOptionsContainer={modalOptionsContainer}
        onRequestClose={() => {}}
      >
        <DropdownList
          options={options}
          optionLabel={optionLabel}
          optionValue={optionValue}
          isMultiple={isMultiple}
          selectedItems={selectedItems}
          selectedItem={selectedItem}
          handleMultipleSelections={handleMultipleSelections}
          handleSingleSelection={handleSingleSelection}
        />
      </CustomModal>
    </>
  );
};

export default DropdownSelect;
