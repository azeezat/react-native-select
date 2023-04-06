/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import DropdownListItem from './DropdownListItem';
import { colors } from '../../styles/colors';

const DropdownList = ({
  options,
  optionLabel,
  optionValue,
  isMultiple,
  isSearchable,
  selectedItems,
  selectedItem,
  handleMultipleSelections,
  handleSingleSelection,
  primaryColor,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  ...rest
}: any) => {
  return (
    <FlatList
      data={options}
      extraData={isMultiple ? selectedItems : selectedItem}
      initialNumToRender={5}
      ListEmptyComponent={
        <View style={styles.emptyListStyle}>
          <Text>No options available</Text>
        </View>
      }
      contentContainerStyle={[
        isSearchable ? { paddingTop: 0 } : styles.contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
      renderItem={(item) =>
        _renderItem(item, {
          optionLabel,
          optionValue,
          isMultiple,
          selectedOption: isMultiple ? selectedItems : selectedItem,
          onChange: isMultiple
            ? handleMultipleSelections
            : handleSingleSelection,
          primaryColor,
          checkboxSize,
          checkboxStyle,
          checkboxLabelStyle,
        })
      }
      keyExtractor={(_item, index) => `Options${index}`}
      {...rest}
    />
  );
};

const _renderItem = ({ item }: any, props: any) => {
  return (
    <DropdownListItem
      item={item}
      optionLabel={props.optionLabel}
      optionValue={props.optionValue}
      isMultiple={props.isMultiple}
      selectedOption={props.selectedOption}
      onChange={props.onChange}
      primaryColor={props.primaryColor}
      checkboxSize={props.checkboxSize}
      checkboxStyle={props.checkboxStyle}
      checkboxLabelStyle={props.checkboxLabelStyle}
    />
  );
};

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    backgroundColor: colors.gray,
    height: 1,
    opacity: 0.15,
  },
  emptyListStyle: { alignItems: 'center', width: '100%', marginVertical: 20 },
  contentContainerStyle: { paddingTop: 20 },
});

export default DropdownList;
