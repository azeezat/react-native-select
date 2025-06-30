import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Input from './components/Input';
import CheckBox from './components/CheckBox';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownFlatList from './components/List/DropdownFlatList';
import DropdownSectionList from './components/List/DropdownSectionList';
import CustomModal from './components/CustomModal';
import { colors } from './styles/colors';
import { DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE } from './constants';
import type {
  DropdownProps,
  DropdownSelectHandle,
  TSelectedItem,
} from './types/index.types';
import {
  extractPropertyFromArray,
  getSelectionsData,
  removeDisabledItems,
} from './utils';
import {
  useSelectionHandler,
  useModal,
  useSearch,
  useIndexOfSelectedItem,
  useSelectAll,
} from './hooks';

export const DropdownSelect = forwardRef<DropdownSelectHandle, DropdownProps>(
  (
    {
      testID,
      placeholder,
      label,
      error,
      helperText,
      options,
      optionLabel = DEFAULT_OPTION_LABEL,
      optionValue = DEFAULT_OPTION_VALUE,
      onValueChange,
      isMultiple = false,
      selectedValue = isMultiple ? [] : '',
      isSearchable,
      dropdownIcon,
      labelStyle,
      placeholderStyle,
      dropdownStyle,
      dropdownIconStyle,
      dropdownContainerStyle,
      dropdownErrorStyle,
      dropdownErrorTextStyle,
      dropdownHelperTextStyle,
      selectedItemStyle,
      multipleSelectedItemStyle,
      primaryColor = colors.gray,
      disabled = false,
      listHeaderComponent,
      listFooterComponent,
      listComponentStyles,
      listEmptyComponent,
      listControls,
      searchControls,
      modalControls,
      checkboxControls,
      selectedItemsControls,
      autoCloseOnSelect = true,
      minSelectableItems,
      maxSelectableItems,
      ...rest
    },
    ref
  ) => {
    /*===========================================
     * Expose the methods to the parent using
     * useImperativeHandle
     *==========================================*/
    useImperativeHandle(ref, () => ({
      open: () => openModal(),
      close: () => closeModal(),
    }));

    /*===========================================
     * Search
     *==========================================*/
    const {
      searchValue,
      setSearchValue,
      setFilteredOptions,
      filteredOptions,
      isSectionList,
    } = useSearch({
      initialOptions: options,
      optionLabel,
      optionValue,
      searchCallback: useCallback(
        (value) => searchControls?.searchCallback?.(value),
        [searchControls]
      ),
    });

    /*===========================================
     * setIndexOfSelectedItem - For ScrollToIndex
     *==========================================*/
    const { listIndex, setListIndex, setIndexOfSelectedItem } =
      useIndexOfSelectedItem({
        options,
        optionLabel,
        isSectionList,
      });

    /*===========================================
     * Reset component states
     *==========================================*/
    const resetOptionsRelatedState = useCallback(() => {
      setSearchValue('');
      setFilteredOptions(options);
      setListIndex({ itemIndex: -1, sectionIndex: -1 });
    }, [options, setFilteredOptions, setListIndex, setSearchValue]);

    /*===========================================
     * Modal
     *==========================================*/
    const { isVisible, openModal, closeModal } = useModal({
      resetOptionsRelatedState,
      disabled,
      modalControls,
    });

    /*===========================================
     * Single and multiple selection Hook
     *==========================================*/
    const {
      selectedItem,
      selectedItems,
      setSelectedItem,
      setSelectedItems,
      handleSingleSelection,
      handleMultipleSelections,
    } = useSelectionHandler({
      initialSelectedValue: selectedValue,
      isMultiple,
      minSelectableItems,
      maxSelectableItems,
      onValueChange,
      closeModal: () => closeModal(),
      autoCloseOnSelect,
    });

    useEffect(() => {
      isMultiple
        ? setSelectedItems(selectedValue as TSelectedItem[])
        : setSelectedItem(selectedValue as TSelectedItem);

      // setSelectedItems already updates selectedValue, so omit it from dependency array to avoid infinite loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setSelectedItems, setSelectedItem, isMultiple, onValueChange]);

    /*===========================================
     * List type
     *==========================================*/
    const ListTypeComponent = isSectionList
      ? DropdownSectionList
      : DropdownFlatList;
    const modifiedSectionData = extractPropertyFromArray(
      filteredOptions,
      'data'
    )?.flat();

    /**
     * `options` is the original array, it never changes. (Do not use except you really need the original array) .
     * `filteredOptions` is a copy of options but can be mutated by `setFilteredOptions`, as a result, the value may change.
     * `modifiedOptions` should only be used for computations. It has the same structure for both `FlatList` and `SectionList`
     */
    const modifiedOptions = isSectionList
      ? modifiedSectionData
      : filteredOptions;

    /*===========================================
     * Select all Hook
     *==========================================*/
    const { selectAll, handleSelectAll } = useSelectAll({
      options: modifiedOptions,
      selectedItems,
      isMultiple,
      onValueChange,
      listControls,
      optionValue,
    });

    return (
      <>
        <Dropdown
          testID={testID}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          selectionData={getSelectionsData({
            isMultiple,
            optionValue,
            selectedItem,
            selectedItems,
            modifiedOptions,
          })}
          optionLabel={optionLabel}
          optionValue={optionValue}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          selectedItemsControls={selectedItemsControls}
          openModal={() => openModal()}
          labelStyle={labelStyle}
          dropdownIcon={dropdownIcon}
          dropdownStyle={dropdownStyle}
          dropdownIconStyle={dropdownIconStyle}
          dropdownContainerStyle={dropdownContainerStyle}
          dropdownErrorStyle={dropdownErrorStyle}
          dropdownErrorTextStyle={dropdownErrorTextStyle}
          dropdownHelperTextStyle={dropdownHelperTextStyle}
          selectedItemStyle={selectedItemStyle}
          multipleSelectedItemStyle={multipleSelectedItemStyle}
          isMultiple={isMultiple}
          primaryColor={primaryColor}
          disabled={disabled}
          placeholderStyle={placeholderStyle}
          setIndexOfSelectedItem={setIndexOfSelectedItem}
          handleMultipleSelections={handleMultipleSelections}
          {...rest}
        />
        <CustomModal
          visible={isVisible}
          onRequestClose={() => closeModal()}
          modalControls={modalControls}
        >
          <ListTypeComponent
            ListHeaderComponent={
              <>
                {isSearchable && (
                  <Input
                    value={searchValue}
                    onChangeText={(text: string) => setSearchValue(text)}
                    style={searchControls?.textInputStyle}
                    primaryColor={primaryColor}
                    textInputContainerStyle={
                      searchControls?.textInputContainerStyle
                    }
                    placeholder={
                      searchControls?.textInputProps?.placeholder || 'Search'
                    }
                    aria-label={
                      searchControls?.textInputProps?.placeholder || 'Search'
                    }
                    {...searchControls?.textInputProps}
                  />
                )}
                {listHeaderComponent}
                {!listControls?.hideSelectAll &&
                  isMultiple &&
                  modifiedOptions?.length > 1 && (
                    <View style={styles.optionsContainerStyle}>
                      <TouchableOpacity accessible={false}>
                        {/* only show this if all the items in the list are not disabled */}
                        {removeDisabledItems(modifiedOptions)?.length !== 0 && (
                          <CheckBox
                            value={selectAll}
                            label={
                              selectAll
                                ? listControls?.unselectAllText || 'Clear all'
                                : listControls?.selectAllText || 'Select all'
                            }
                            onChange={() => handleSelectAll()}
                            primaryColor={primaryColor}
                            checkboxControls={checkboxControls}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
              </>
            }
            ListFooterComponent={listFooterComponent}
            listComponentStyles={listComponentStyles}
            options={filteredOptions}
            optionLabel={optionLabel}
            optionValue={optionValue}
            isMultiple={isMultiple}
            isSearchable={isSearchable}
            selectedItems={selectedItems}
            selectedItem={selectedItem}
            handleMultipleSelections={handleMultipleSelections}
            handleSingleSelection={handleSingleSelection}
            primaryColor={primaryColor}
            checkboxControls={checkboxControls}
            listIndex={listIndex}
            listEmptyComponent={listEmptyComponent}
            emptyListMessage={listControls?.emptyListMessage}
            keyboardShouldPersistTaps={listControls?.keyboardShouldPersistTaps}
          />
        </CustomModal>
      </>
    );
  }
);
const styles = StyleSheet.create({
  optionsContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
});

export default DropdownSelect;
