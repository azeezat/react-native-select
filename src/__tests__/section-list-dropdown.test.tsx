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

  const options:TSectionList = [
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
      options={options}
      onValueChange={() => {}}
      testID="section-list-test-id"
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

  test('open modal when dropdown is clicked', async () => {
    const user = userEvent.setup();
    render(sectionListDropdown);
    await user.press(screen.getByText('Select an option'));
    expect(screen.getByText(options[0].title));
  });
});
