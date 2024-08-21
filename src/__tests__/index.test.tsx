import React from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';

describe('Initial state of component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const defaultDropdown = (
    <DropdownSelect options={[]} onValueChange={() => {}} />
  );

  test('show default texts', () => {
    render(defaultDropdown);
    expect(screen.getByText('Select an option'));
  });

  test('show default styles', () => {
    render(defaultDropdown);
    const placeholderStyle = screen.getByText('Select an option');
    console.log(placeholderStyle.props)
    expect(placeholderStyle.props.style).toMatchObject([
      { color: '#000000' },
      undefined,
    ]);
  });

  test('open modal when dropdown is clicked', async () => {
    const user = userEvent.setup();
    render(defaultDropdown);
    await user.press(screen.getByText('Select an option'));
    expect(screen.getByText('No options available'));
  });
});
