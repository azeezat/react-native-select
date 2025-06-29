import React from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { inputStyles } from '../../styles/input';
import DropdownSelectedItem from './DropdownSelectedItem';
import {
  TDropdownInputProps,
  TFlatListItem,
  TSelectedItem,
  TSelectedItemsControls,
  TSelectedItemWithReactComponent,
} from 'src/types/index.types';

export interface DropdownSelectedItemsContainerProps {
  openModal: () => void;
  selectedItem: TSelectedItemWithReactComponent;
  selectedItems: TSelectedItemWithReactComponent[];
  optionLabel: string;
  optionValue: string;
  setIndexOfSelectedItem: (label: string) => void;
  selectedItemsControls?: TSelectedItemsControls;
  selectionData: TFlatListItem | TFlatListItem[];
  handleMultipleSelections?: (value: TSelectedItem) => void;
}

const DropdownSelectedItemsContainer = ({
  placeholder,
  error,
  selectionData = [],
  openModal,
  isMultiple,
  selectedItem,
  selectedItems,
  optionLabel,
  optionValue,
  dropdownStyle,
  placeholderStyle = {},
  selectedItemStyle = {},
  multipleSelectedItemStyle = {},
  dropdownErrorStyle,
  primaryColor,
  disabled = false,
  setIndexOfSelectedItem,
  selectedItemsControls,
  handleMultipleSelections,
}: TDropdownInputProps & DropdownSelectedItemsContainerProps) => {
  const openActions = (label: string) => {
    openModal();
    setIndexOfSelectedItem(label); // immediately scrolls to list item with the specified label when modal
  };

  return (
    <Pressable
      onPress={() => openModal()}
      style={({ pressed }) => [
        pressed && {
          ...inputStyles.inputFocusState,
          borderColor: primaryColor,
        },
        { ...inputStyles.input, ...dropdownStyle },
        error && //this must be last
          error !== '' &&
          !pressed && {
            ...inputStyles.inputFocusErrorState,
            ...dropdownErrorStyle,
          },
      ]}
      disabled={disabled}
      aria-disabled={disabled}
      testID="react-native-input-select-dropdown-input-container"
    >
      <ScrollView
        horizontal
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={styles.selectedItemsContainer}
          onStartShouldSetResponder={() => true}
        >
          {isMultiple ? (
            (selectionData as TFlatListItem[])?.map((data, i) => {
              const label = data[optionLabel];
              const value = data[optionValue];

              return (
                <DropdownSelectedItem
                  onPress={() => openActions(label as string)}
                  key={`react-native-input-select-list-item-${Math.random()}-${i}`}
                  style={[
                    styles.selectedItems,
                    { backgroundColor: primaryColor },
                    multipleSelectedItemStyle,
                  ]}
                  closeIconStyles={{
                    tintColor:
                      (multipleSelectedItemStyle as TextStyle)?.color ||
                      styles.selectedItems.color,
                  }}
                  label={label}
                  disabled={disabled}
                  showRemoveIcon={selectedItemsControls?.showRemoveIcon || true}
                  removeItemIcon={selectedItemsControls?.removeItemIcon}
                  onRemoveItem={() => {
                    handleMultipleSelections?.(value as TSelectedItem);
                    selectedItemsControls?.onRemoveItem?.(); //user defined control
                  }}
                  testId={`${i}`}
                />
              );
            })
          ) : (
            <DropdownSelectedItem
              onPress={() =>
                openActions(
                  String((selectionData as TFlatListItem)?.[optionLabel] ?? '')
                )
              }
              style={[styles.blackText, selectedItemStyle]}
              label={(selectionData as TFlatListItem)[optionLabel] as string}
              disabled={disabled}
            />
          )}

          {/* Placeholder */}
          {selectedItem === '' && selectedItems?.length === 0 && (
            <DropdownSelectedItem
              onPress={() => openModal()}
              style={[styles.blackText, placeholderStyle]}
              label={placeholder ?? 'Select an option'}
              disabled={disabled}
            />
          )}
        </View>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
    overflow: 'hidden',
  },
  blackText: { color: colors.black },
});

export default DropdownSelectedItemsContainer;
