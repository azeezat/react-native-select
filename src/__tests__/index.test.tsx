import React from 'react';
import DropdownSelect from '../index';


import { render,screen } from '@testing-library/react-native';

test('basic test', () => {
  render(<DropdownSelect options={[]} onValueChange={() => {}} />);
  expect(screen.getByText(" Select an option"))
});