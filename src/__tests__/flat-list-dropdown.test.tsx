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

  const flatListDropdown = (
    <DropdownSelect
      options={options}
      onValueChange={() => {}}
      testID="section-list-test-id"
      placeholder="Select food"
      optionLabel="name"
      optionValue="value"
    />
  );

  test('show default texts', () => {
    render(flatListDropdown);
    expect(screen.getByTestId('section-list-test-id'));
    expect(screen.getByText('Select food'));
  });

  test('show default styles', () => {
    render(flatListDropdown);
    const placeholderStyle = screen.getByText('Select food');
    expect(placeholderStyle.props.style).toMatchObject([
      { color: '#000000' },
      undefined,
    ]);
  });

  test('open modal when dropdown is clicked', async () => {
    const user = userEvent.setup();
    render(flatListDropdown);
    await user.press(screen.getByText('Select food'));
    expect(screen.getByText(options[0].name as string));
    expect(screen.getByText('Chicken', { exact: false }));
  });
});
