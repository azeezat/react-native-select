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
import { TSectionList } from 'src/types/index.types';

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
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  checkboxComponentStyles,
  checkboxComponent,
  listComponentStyles,
  listIndex,
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

  const scrollToLocation = (listIndex: any) => {
    sectionlistRef.current?.scrollToLocation({
      sectionIndex: listIndex.sectionIndex,
      animated: true,
      itemIndex: listIndex.itemIndex,
    });
  };

  useEffect(() => {
    if (options?.length) {
      scrollToLocation(listIndex);
    }
  }, [listIndex, options]);

  return (
    <SectionList
      sections={options}
      extraData={isMultiple ? selectedItems : selectedItem}
      initialNumToRender={5}
      ListEmptyComponent={
        <ListEmptyComponent
          listEmptyComponentStyle={listComponentStyles?.listEmptyComponentStyle}
        />
      }
      contentContainerStyle={[
        isSearchable ? { paddingTop: 0 } : styles.contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => (
        <ItemSeparatorComponent
          itemSeparatorStyle={listComponentStyles?.itemSeparatorStyle}
        />
      )}
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
          checkboxSize, // kept for backwards compatibility
          checkboxStyle, // kept for backwards compatibility
          checkboxLabelStyle, // kept for backwards compatibility
          checkboxComponentStyles,
          checkboxComponent,
          expandedSections,
        })
      }
      renderSectionHeader={({ section: { title, data } }) =>
        data?.length &&
        title && (
          <SectionHeaderTitle
            title={title}
            sectionHeaderStyle={listComponentStyles?.sectionHeaderStyle}
            onPress={() => handleToggleListExpansion(title)}
            isExpanded={expandedSections.has(title)}
          />
        )
      }
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
      checkboxSize={props.checkboxSize}
      checkboxStyle={props.checkboxStyle}
      checkboxLabelStyle={props.checkboxLabelStyle}
      checkboxComponentStyles={props.checkboxComponentStyles}
      checkboxComponent={props.checkboxComponent}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingTop: 20 },
});

export default DropdownSectionList;
