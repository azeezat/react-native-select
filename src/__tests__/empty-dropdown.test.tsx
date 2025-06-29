import React, { createRef } from 'react';
import DropdownSelect from '../index';
import { render, screen, userEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { Platform, Pressable, Text } from 'react-native';
import { DropdownSelectHandle } from 'src/types/index.types';

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
    expect(placeholderStyle.props.style).toMatchObject({ color: '#000000' });
  });

  test('open and close modal', async () => {
    Platform.OS = 'android';

    render(defaultDropdown);

    //open modal when dropdown is clicked
    await user.press(screen.getByText(placeholder));
    expect(screen.getByText('No options available'));

    // close the modal after opening
    const closeModal = screen.getByLabelText('close modal');
    await user.press(closeModal);
    expect(screen.getByText(placeholder));

    //check if callback was called on android
    expect(mockCloseModal).toHaveBeenCalledTimes(1);

    //open modal when dropdown trailing icon is clicked
    await user.press(screen.getByTestId('dropdown-trailing-icon'));
    expect(screen.getByText('No options available'));
    
  });

  test('should open and close modal with useRef', async () => {
    Platform.OS = 'android';
    const dropdownRef = createRef<DropdownSelectHandle>();
    render(
      <>
        <Pressable onPress={() => dropdownRef.current?.open()}>
          <Text>Open Modal</Text>
        </Pressable>

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
          ref={dropdownRef}
          listHeaderComponent={
            <Pressable onPress={() => dropdownRef.current?.close()}>
              <Text>Close Modal</Text>
            </Pressable>
          }
        />
      </>
    );
    await user.press(screen.getByText('Open Modal'));
    expect(screen.getByText('No options available'));
    await user.press(screen.getByText('Close Modal'));
    expect(mockCloseModal).toHaveBeenCalled();
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

    expect(screen.queryByText('Close Modal')).toBeNull();
    expect(dropdownInput.props?.accessibilityState?.disabled).toBe(true);
  });
});
