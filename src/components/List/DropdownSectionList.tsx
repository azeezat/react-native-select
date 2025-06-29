/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import DropdownListItem from './DropdownListItem';
import {
  ItemSeparatorComponent,
  ListEmptyComponent,
  SectionHeaderTitle,
} from '../Others';
import { extractPropertyFromArray } from '../../utils';
import { TSectionList } from '../../types/index.types';

const DropdownSectionList = ({
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
}: any) => {
  const [expandedSections, setExpandedSections] = useState(new Set());

  /**
   * Expand all sections
   */
  useEffect(() => {
    let initialState = new Set(extractPropertyFromArray(options, 'title'));
    setExpandedSections(initialState);
  }, [options]);

  /**
   * @param title
   */
  const handleToggleListExpansion = (title: string) => {
    setExpandedSections((expandedSectionsState) => {
      // Using Set here but you can use an array too
      const next = new Set(expandedSectionsState);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  /**
   * @description Scroll to item location
   */

  const sectionlistRef = useRef<SectionList<TSectionList>>(null);

  const scrollToLocation = (index: any) => {
    sectionlistRef?.current?.scrollToLocation({
      sectionIndex: index.sectionIndex,
      animated: true,
      itemIndex: index.itemIndex,
    });
  };

  useEffect(() => {
    if (listIndex.itemIndex >= 0 && listIndex.sectionIndex >= 0) {
      scrollToLocation(listIndex);
    }
  }, [listIndex]);

  const itemSeparator = () => (
    <ItemSeparatorComponent
      itemSeparatorStyle={listComponentStyles?.itemSeparatorStyle}
    />
  );

  return (
    <SectionList
      testID="react-native-input-select-section-list"
      sections={options}
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
          primaryColor,
          checkboxControls,
          expandedSections,
        })
      }
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeaderTitle
          title={title}
          sectionHeaderStyle={listComponentStyles?.sectionHeaderStyle}
          onPress={() => handleToggleListExpansion(title)}
          isExpanded={expandedSections.has(title)}
        />
      )}
      keyExtractor={(_item, index) => `Options${index}`}
      stickySectionHeadersEnabled={false}
      ref={sectionlistRef}
      onScrollToIndexFailed={() => {
        setTimeout(() => {
          scrollToLocation(listIndex);
        }, 500);
      }}
      {...rest}
    />
  );
};

const _renderItem = ({ section: { title }, item }: any, props: any) => {
  const isExpanded = props?.expandedSections.has(title);

  //return null if it is not expanded
  if (!isExpanded) return null;

  return (
    <DropdownListItem
      item={item}
      optionLabel={props.optionLabel}
      optionValue={props.optionValue}
      isMultiple={props.isMultiple}
      selectedOption={props.selectedOption}
      onChange={props.onChange}
      primaryColor={props.primaryColor}
      checkboxControls={props.checkboxControls}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingTop: 20 },
});

export default DropdownSectionList;
