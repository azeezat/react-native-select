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

  const options: TFlatList = [
    { name: '🍛 Rice', value: '1', disabled: true },
    { name: <Text>🍗 Chicken</Text>, value: '2' },
    { name: '🥦 Brocoli', value: '3', disabled: true },
    { name: '🍕 Pizza', value: '4' },
  ];

  const mockOnValueChange = jest.fn();
  const placeholder = 'Select food';
  const testId = 'section-list-test-id';
  const mockSearchCallback = jest.fn();

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
    const user = userEvent.setup();
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
      const user = userEvent.setup();
      render(flatListDropdown);
      await user.press(screen.getByText(placeholder));
      expect(screen.getByText(options[0].name as string));
      const optionToTestFor = screen.getByText('Chicken', { exact: false });

      expect(optionToTestFor);

      //select one option
      await user.press(optionToTestFor);
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
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
      />
    );

    test('open modal when dropdown is clicked and select a multiple items', async () => {
      const user = userEvent.setup();
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
      expect(thirdSelection);
      await user.press(forthSelection);

      expect(mockOnValueChangeMultiSelect).toHaveBeenCalledTimes(2);

      //`Clear All` should now be visible since all items in the list have been selected
      screen.getByText('Clear all');
    });
  });
});
