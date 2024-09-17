import React from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { TFlatList } from 'src/types/index.types';
import { Text } from 'react-native';

describe('Initial state of component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup();

  const options: TFlatList = [
    { name: '🍛 Rice', value: '1', disabled: true },
    { name: <Text>🍗 Chicken</Text>, value: '2' },
    { name: '🥦 Brocoli', value: '3', disabled: true },
    { name: '🍕 Pizza', value: '4' },
  ];

  const placeholder = 'Select food';
  const testId = 'section-list-test-id';
  const mockOnValueChange = jest.fn();
  const mockSearchCallback = jest.fn();
  const mockSelectAllCallback = jest.fn();
  const mockUnselectAllCallback = jest.fn();

  const flatListDropdown = (
    <DropdownSelect
      selectedValue=""
      options={options}
      onValueChange={mockOnValueChange}
      testID={testId}
      placeholder={placeholder}
      optionLabel="name"
      optionValue="value"
      isSearchable
      searchControls={{
        textInputProps: { placeholder: 'Search anything here' },
        searchCallback: mockSearchCallback,
      }}
    />
  );

  test('show default texts', () => {
    render(flatListDropdown);
    expect(screen.getByTestId(testId));
    expect(screen.getByText(placeholder));
  });

  test('show default styles', () => {
    render(flatListDropdown);
    const placeholderStyle = screen.getByText(placeholder);
    expect(placeholderStyle.props.style).toMatchObject([
      { color: '#000000' },
      undefined,
    ]);
  });

  test('search', async () => {
    render(flatListDropdown);

    //open modal
    await user.press(screen.getByText(placeholder));

    let totalCount = 0;

    //search non-existent item
    const searchPlaceholder = 'Search anything here';
    const searchBox = screen.getByPlaceholderText(searchPlaceholder);
    let text = 'hello';
    totalCount += text.length;
    await user.type(searchBox, text);
    screen.getByText('No options available');
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount);

    //search existent item
    text = 'rice';
    totalCount += text.length;
    await user.clear(searchBox);
    await user.type(searchBox, text);
    screen.getByText(text, { exact: false });
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount + 1); //adding 1 because the clear event also called the search callback
  });

  describe('Single select', () => {
    test('open modal when dropdown is clicked and select a single item', async () => {
      render(flatListDropdown);
      await user.press(screen.getByText(placeholder));
      expect(screen.getByText(options[0].name as string));
      const optionToTestFor = screen.getByText('Chicken', { exact: false });

      expect(optionToTestFor);

      //select one option
      await user.press(optionToTestFor);
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    });

    test('autoCloseOnSelect=false should not close modal after selection', async () => {
      const flatListDropdownWithAutoClose = (
        <DropdownSelect
          selectedValue=""
          options={options}
          onValueChange={mockOnValueChange}
          testID={testId}
          placeholder={placeholder}
          optionLabel="name"
          optionValue="value"
          autoCloseOnSelect={false}
        />
      );

      render(flatListDropdownWithAutoClose);
      await user.press(screen.getByText(placeholder));

      // select single option without closing the modal
      await user.press(screen.getByText(options[0].name as string));
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
      screen.getByTestId('react-native-input-select-flat-list');
    });
  });

  describe('Multiple select', () => {
    let mockOnValueChangeMultiSelect = jest.fn();

    const flatListDropdownWithMultiSelect = (
      <DropdownSelect
        options={options}
        selectedValue={[]}
        onValueChange={mockOnValueChangeMultiSelect}
        testID="section-list-test-id"
        placeholder={placeholder}
        optionLabel="name"
        optionValue="value"
        isMultiple
        isSearchable
        listControls={{
          selectAllCallback: mockSelectAllCallback,
          unselectAllCallback: mockUnselectAllCallback,
        }}
      />
    );

    test('open modal when dropdown is clicked and select a multiple items', async () => {
      render(flatListDropdownWithMultiSelect);
      await user.press(screen.getByText(placeholder));

      // select multiple options
      const firstSelection = screen.getByText(options[0].name as string); // This value has been disabled, so no call is expected
      expect(firstSelection);
      await user.press(firstSelection);

      const secondSelection = screen.getByText('Chicken', { exact: false });
      expect(secondSelection);
      await user.press(secondSelection);

      const thirdSelection = screen.getByText(options[2].name as string); // This value has been disabled, so no call is expected
      expect(thirdSelection);
      await user.press(thirdSelection);

      const forthSelection = screen.getByText(options[3].name as string);
      expect(forthSelection);
      await user.press(forthSelection);

      expect(mockOnValueChangeMultiSelect).toHaveBeenCalledTimes(2);

      //`Clear All` should now be visible since all items in the list have been selected
      screen.getByText('Clear all');
    });

    test('select all / unselect all', async () => {
      render(flatListDropdownWithMultiSelect);
      await user.press(screen.getByText(placeholder));

      // select all
      const selectAll = screen.getByText('Select all');
      await user.press(selectAll);
      expect(mockSelectAllCallback).toHaveBeenCalledTimes(1);

      // unselect all
      const clearAll = screen.getByText('Clear all'); //`Clear all` should now be visible since all items in the list have been selected
      await user.press(clearAll);
      expect(mockUnselectAllCallback).toHaveBeenCalledTimes(1); //`Select all` should now be visible since all items in the list have been deselected
      screen.getByText('Select all'); //`Select all` should now be visible since all items in the list have been deselected
    });
  });

  test('auto scroll to index of selected item in flat list', async () => {
    const selectedItem = options[3];

    const flatListDropdownWithMultiSelectWithSelectedItem = (
      <DropdownSelect
        options={options}
        selectedValue={[selectedItem.value as string]}
        onValueChange={() => {}}
        testID="section-list-test-id"
        placeholder={placeholder}
        optionLabel="name"
        isMultiple
      />
    );
    render(flatListDropdownWithMultiSelectWithSelectedItem);
    await user.press(screen.getByTestId('dropdown-input-container'));

    const itemCount = screen.getAllByText(selectedItem.name as string);
    expect(itemCount.length).toBe(2); //since the item is selected, it would show on the dropdown container hence the reason we have two items
  });
});
