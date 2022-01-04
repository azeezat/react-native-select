import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
}: any) => {
  return (
    <FlatList
      data={options}
      extraData={isMultiple ? selectedItems : selectedItem}
      initialNumToRender={5}
      // ListEmptyComponent={
      //   <EmptyStateComponent
      //     style={{alignItems: 'flex-start', marginTop: 30}}
      //     message="Be the first to reply"
      //   />
      // }
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
});

export default DropdownList;
