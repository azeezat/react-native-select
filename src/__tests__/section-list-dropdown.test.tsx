import React from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { TSectionList } from '../types/index.types';
import { extractPropertyFromArray, removeDisabledItems } from '../utils';

const selectAllOptions = (options: TSectionList) => {
  const modifiedSectionData = extractPropertyFromArray(options, 'data')?.flat();
  let val = removeDisabledItems(modifiedSectionData);
  return val.map((item) => item.label as string);
};

describe('Initial state of component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup();

  const placeholder = 'Select an option';
  const mockOnValueChange = jest.fn();
  const mockSearchCallback = jest.fn();
  const mockSelectAllCallback = jest.fn();
  const mockUnselectAllCallback = jest.fn();

  const options: TSectionList = [
    {
      title: 'Main dishes',
      data: [
        { label: 'Pizza', value: 'A' },
        { label: 'Burger', value: 'B' },
        { label: 'Risotto', value: 'C' },
      ],
    },
    {
      title: 'Sides',
      data: [
        { label: 'Ice cream', value: 'D' },
        { label: 'Cheesecake', value: 'E' },
      ],
    },
    {
      title: 'Drinks',
      data: [
        { label: 'Water', value: 'F', disabled: true },
        { label: 'Coke', value: 'G' },
        { label: 'Juice', value: 'H' },
      ],
    },
  ];

  const sectionListDropdown = (
    <DropdownSelect
      selectedValue=""
      options={options}
      onValueChange={mockOnValueChange}
      testID="section-list-test-id"
      isSearchable
      searchControls={{
        textInputProps: { placeholder: 'Search anything here' },
        searchCallback: mockSearchCallback,
      }}
    />
  );

  test('show default texts', () => {
    render(sectionListDropdown);
    expect(screen.getByTestId('section-list-test-id'));
    expect(screen.getByText('Select an option'));
  });

  test('show default styles', () => {
    render(sectionListDropdown);
    const placeholderStyle = screen.getByText('Select an option');
    expect(placeholderStyle.props.style).toMatchObject([
      { color: '#000000' },
      undefined,
    ]);
  });

  test('search', async () => {
    const user = userEvent.setup();
    render(sectionListDropdown);

    //open modal
    await user.press(screen.getByText(placeholder));

    let totalCount = 0;

    //search non-existent item
    const searchPlaceholder = 'Search anything here';
    const searchBox = screen.getByPlaceholderText(searchPlaceholder);
    let text = 'hello';
    await user.type(searchBox, text);
    totalCount += text.length;
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount);

    //search existent item
    text = 'pizza';
    await user.clear(searchBox);
    await user.type(searchBox, text);
    totalCount += text.length;
    screen.getByText(text, { exact: false });
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount);
  });

  describe('Single select', () => {
    test('open modal when dropdown is clicked and select a single item', async () => {
      render(sectionListDropdown);
      await user.press(screen.getByText(placeholder));
      expect(screen.getByText(options[0].data[0].label as string));
      const optionToTestFor = screen.getByText(
        options[0].data[2].label as string,
        { exact: false }
      );

      expect(optionToTestFor);

      //select one option
      await user.press(optionToTestFor);
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Multiple select', () => {
    let mockOnValueChangeMultiSelect = jest.fn();

    const sectionListDropdownWithMultiSelect = (
      <DropdownSelect
        options={options}
        selectedValue={[]}
        onValueChange={mockOnValueChangeMultiSelect}
        testID="section-list-test-id"
        placeholder={placeholder}
        isMultiple
        isSearchable
        listControls={{
          selectAllCallback: mockSelectAllCallback,
          unselectAllCallback: mockUnselectAllCallback,
        }}
      />
    );

    // TODO: revisit
    test.skip('open modal when dropdown is clicked and select a multiple items', async () => {
      const user = userEvent.setup();
      render(sectionListDropdownWithMultiSelect);
      await user.press(screen.getByText(placeholder));

      let count = 0;

      // if there is a disabled item in the list, expect no call
      options.map(async (section) => {
        section.data.map(async (item) => {
          const listItem = screen.getByText(item.label.toString());
          expect(listItem);
          await user.press(listItem);
          if (!item.disabled) {
            count += 1;
          }
        });
      });

      expect(mockOnValueChangeMultiSelect).toHaveBeenCalledTimes(count);

      //`Clear All` should now be visible since all items in the list have been selected
      screen.getByText('Clear all');
    });

    test('select all / unselect all', async () => {
      const { rerender } = render(sectionListDropdownWithMultiSelect);
      await user.press(screen.getByTestId('react-native-input-select-dropdown-input-container'));

      // select all
      const selectAll = screen.getByText('Select all');
      await user.press(selectAll);
      expect(mockSelectAllCallback).toHaveBeenCalledTimes(1);

      //N.B There is a useEffect hook that check if all the items are actually selected hence the reason for rerendering
      // Rerender the component with updated `selectedValue` prop
      rerender(
        <DropdownSelect
          options={options}
          selectedValue={selectAllOptions(options)}
          onValueChange={mockOnValueChangeMultiSelect}
          testID="section-list-test-id"
          placeholder={placeholder}
          isMultiple
          isSearchable
          listControls={{
            selectAllCallback: mockSelectAllCallback,
            unselectAllCallback: mockUnselectAllCallback,
          }}
        />
      );

      // unselect all
      const clearAll = screen.getByText('Clear all'); //`Clear all` should now be visible since all items in the list have been selected
      await user.press(clearAll);
      expect(mockUnselectAllCallback).toHaveBeenCalledTimes(1);
    });
  });

  test('auto scroll to index of selected item in section list', async () => {
    const selectedItem = options[0].data[2];

    const flatListDropdownWithMultiSelectWithSelectedItem = (
      <DropdownSelect
        options={options}
        selectedValue={[selectedItem.value as string]}
        onValueChange={() => {}}
        placeholder={placeholder}
        isMultiple
      />
    );
    render(flatListDropdownWithMultiSelectWithSelectedItem);
    await user.press(screen.getByTestId('react-native-input-select-dropdown-input-container'));

    const itemCount = screen.getAllByText(selectedItem.label as string);
    expect(itemCount.length).toBe(2); //since the item is selected, it would show on the dropdown container hence the reason we have two items
  });
});
