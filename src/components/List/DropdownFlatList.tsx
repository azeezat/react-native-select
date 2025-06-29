/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import DropdownListItem from './DropdownListItem';
import { ItemSeparatorComponent, ListEmptyComponent } from '../Others';
import { TFlatList } from '../../types/index.types';

const DropdownFlatList = ({
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
  checkboxControls,
  listComponentStyles,
  listIndex,
  emptyListMessage,
  listEmptyComponent,
  ...rest
}: any & FlatListProps<TFlatList>) => {
  const flatlistRef = useRef<FlatList<TFlatList>>(null);

  const scrollToItem = (index: number) => {
    flatlistRef?.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  useEffect(() => {
    if (listIndex.itemIndex >= 0) {
      scrollToItem(listIndex.itemIndex);
    }
  }, [listIndex]);

  const itemSeparator = () => (
    <ItemSeparatorComponent
      itemSeparatorStyle={listComponentStyles?.itemSeparatorStyle}
    />
  );

  return (
    <FlatList
      testID="react-native-input-select-flat-list"
      data={options}
      extraData={isMultiple ? selectedItems : selectedItem}
      initialNumToRender={5}
      ListEmptyComponent={
        listEmptyComponent || (
          <ListEmptyComponent
            listEmptyComponentStyle={
              listComponentStyles?.listEmptyComponentStyle
            }
            emptyListMessage={emptyListMessage}
          />
        )
      }
      contentContainerStyle={[
        isSearchable ? { paddingTop: 0 } : styles.contentContainerStyle,
      ]}
      ItemSeparatorComponent={itemSeparator}
      renderItem={(item) =>
        _renderItem(item, {
          optionLabel,
          optionValue,
          isMultiple,
          selectedOption: isMultiple ? selectedItems : selectedItem,
          onChange: isMultiple
            ? handleMultipleSelections
            : handleSingleSelection,
          scrollToItem,
          primaryColor,
          checkboxControls,
        })
      }
      keyExtractor={(_item, index) => `Options${index}`}
      ref={flatlistRef}
      onScrollToIndexFailed={({ index }) => {
        setTimeout(() => {
          scrollToItem(index);
        }, 500);
      }}
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
      scrollToItem={props.scrollToItem}
      checkboxControls={props.checkboxControls}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingTop: 20 },
});

export default DropdownFlatList;
