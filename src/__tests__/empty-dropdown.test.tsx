import React from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { PlatformOSType } from 'react-native';

export const mockPlatform = (OS: PlatformOSType) => {
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
    OS,
    select: (config: { [x: string]: any }) => config[OS],
  }));
};

describe('Initial state of component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup();

  // TODO: test these mocks once you are able to simulate specific device types like android and iOS
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();

  const testId = 'some-random-test-id';
  const placeholder = 'Select an option';
  const error = 'This is an error';
  const helperText = 'This is an helper text';

  const defaultDropdown = (
    <DropdownSelect
      label="Default dropdown"
      selectedValue={''}
      options={[]}
      onValueChange={() => {}}
      testID={testId}
      modalControls={{
        modalProps: {
          onShow: mockOpenModal,
          onDismiss: mockCloseModal,
        },
      }}
      error={error}
    />
  );

  test('show default texts', () => {
    render(defaultDropdown);
    const entireDropdown = screen.getByTestId(testId);
    expect(entireDropdown);
    expect(screen.getByText(placeholder));
    expect(screen.getByText(error));
  });

  test('show default styles', () => {
    render(defaultDropdown);
    const placeholderStyle = screen.getByText(placeholder);
    expect(placeholderStyle.props.style).toMatchObject([
      { color: '#000000' },
      undefined,
    ]);
  });

  test('open and close modal', async () => {
    render(defaultDropdown);

    //open modal when dropdown is clicked
    await user.press(screen.getByText(placeholder));
    expect(screen.getByText('No options available'));

    // close the modal after opening
    const closeModal = screen.getByLabelText('close modal');
    await user.press(closeModal);
    expect(screen.getByText(placeholder));

    //check if callback was called on android
    mockPlatform('android');
    expect(mockCloseModal).toHaveBeenCalledTimes(0); //revisit
  });

  const disabledDropdown = (
    <DropdownSelect
      selectedValue={''}
      options={[]}
      onValueChange={() => {}}
      modalControls={{
        modalProps: {
          onShow: mockOpenModal,
          onDismiss: mockCloseModal,
        },
      }}
      disabled
      helperText={helperText}
    />
  );

  test('helper text', async () => {
    render(disabledDropdown);
    expect(screen.getByText(helperText));
  });

  test('Disabled dropdown should not be clickable', async () => {
    render(disabledDropdown);

    let dropdownInput = screen.getByTestId(
      'react-native-input-select-dropdown-input-container'
    );
    await user.press(dropdownInput);

    expect(dropdownInput.props?.accessibilityState?.disabled).toBe(true);
  });
});
