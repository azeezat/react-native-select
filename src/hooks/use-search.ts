import { useState, useCallback, useEffect } from 'react';
import type {
  TFlatList,
  TSectionList,
  TFlatListItem,
  TSectionListItem,
} from '../types/index.types';
import { escapeRegExp, isSectionList } from '../utils';

interface UseSearchProps {
  initialOptions: TFlatList | TSectionList;
  optionLabel: string;
  optionValue: string;
  searchCallback: (value: string) => void;
}

export const useSearch = ({
  initialOptions,
  optionLabel,
  optionValue,
  searchCallback,
}: UseSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<
    TFlatList | TSectionList
  >(initialOptions);

  const resetOptionsToDefault = (options: TFlatList | TSectionList) => {
    setFilteredOptions(options);
  };

  useEffect(() => {
    resetOptionsToDefault(initialOptions);
    return () => {};
  }, [initialOptions]);

  const searchFlatList = useCallback(
    (flatList: TFlatList, regexFilter: RegExp) => {
      return flatList.filter((item: TFlatListItem) => {
        return (
          item[optionLabel]?.toString().toLowerCase().search(regexFilter) !==
            -1 ||
          item[optionValue]?.toString().toLowerCase().search(regexFilter) !== -1
        );
      });
    },
    [optionLabel, optionValue]
  );

  const searchSectionList = useCallback(
    (sectionList: TSectionList, regexFilter: RegExp) => {
      return sectionList.map((listItem: TSectionListItem) => {
        // A section list is the combination of several flat lists
        const filteredData = searchFlatList(listItem.data, regexFilter);

        return { ...listItem, data: filteredData };
      });
    },
    [searchFlatList]
  );

  const isSection = isSectionList(initialOptions);

  const onSearch = useCallback(
    (value: string) => {
      searchCallback?.(value);

      const searchText = escapeRegExp(value).toLowerCase().trim();
      const regexFilter = new RegExp(searchText, 'i');

      const searchResults = isSection
        ? searchSectionList(initialOptions as TSectionList, regexFilter)
        : searchFlatList(initialOptions as TFlatList, regexFilter);

      setFilteredOptions(searchResults);
    },
    [
      initialOptions,
      isSection,
      searchCallback,
      searchFlatList,
      searchSectionList,
    ]
  );

  useEffect(() => {
    if (searchValue) {
      onSearch(searchValue);
    } else {
      resetOptionsToDefault(initialOptions);
    }
  }, [initialOptions, onSearch, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredOptions,
    setFilteredOptions,
    isSectionList: isSection,
  };
};
