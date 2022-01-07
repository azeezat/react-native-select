import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import DropdownListItem from './DropdownListItem';
import { colors } from './styles/colors';

const DropdownList = ({
  options,
  optionLabel,
  optionValue,
  isMultiple,
  selectedItems,
  selectedItem,
  handleMultipleSelections,
  handleSingleSelection,
  primaryColor,
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
        })
      }
      keyExtractor={(_item, index) => `Options${index}`}
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
    />
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackgroundStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalOptionsContainer: {
    maxHeight: '50%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  itemSeparatorStyle: {
    backgroundColor: colors.gray,
    height: 1,
    opacity: 0.15,
  },
  emptyListStyle: { alignItems: 'center', width: '100%', marginVertical: 20 },
});

export default DropdownList;
