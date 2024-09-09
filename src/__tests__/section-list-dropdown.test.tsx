import React from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { TSectionList } from 'src/types/index.types';

describe('Initial state of component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockSearchCallback = jest.fn();
  const placeholder = 'Select an option';

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
      onValueChange={() => {}}
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
    totalCount += text.length;
    await user.type(searchBox, text);
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount);

    //search existent item
    text = 'pizza';
    totalCount += text.length;
    await user.clear(searchBox);
    await user.type(searchBox, text);
    screen.getByText(text, { exact: false });
    expect(mockSearchCallback).toHaveBeenCalledTimes(totalCount + 1); //adding 1 because the clear event also called the search callback
  });

  test('open modal when dropdown is clicked', async () => {
    const user = userEvent.setup();
    render(sectionListDropdown);
    await user.press(screen.getByText(placeholder));
    expect(screen.getByText(options[0].title));
  });
});
