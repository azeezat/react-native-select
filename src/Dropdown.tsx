import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from './styles/colors';
import { inputStyles } from './styles/input';
import { typography } from './styles/typography';

const Dropdown = ({
  label,
  placeholder,
  helperText,
  error,
  getSelectedItemsLabel,
  handleToggleModal,
  isMultiple,
  selectedItem,
  selectedItems,
  labelStyle,
  dropdownStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  primaryColor,
  disabled,
}: any) => {
  return (
    <View style={[styles.dropdownInputContainer, dropdownContainerStyle]}>
      {label && label !== '' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <Pressable
        onPress={() => handleToggleModal()}
        style={({ pressed }) => [
          pressed && {
            ...inputStyles.inputFocusState,
            borderColor: primaryColor,
          },
          inputStyles.input,
          dropdownStyle,
          error && //order matters
            error !== '' &&
            !pressed && {
              ...inputStyles.inputFocusErrorState,
              ...dropdownErrorStyle,
            },
        ]}
        disabled={disabled}
      >
        <ScrollView
          horizontal
          alwaysBounceHorizontal
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={styles.selectedItemsContainer}
            onStartShouldSetResponder={() => true}
          >
            {isMultiple ? (
              getSelectedItemsLabel().map((item: any, i: Number) => (
                <TouchableOpacity
                  onPress={() => handleToggleModal()}
                  key={`SelectedItems${i}`}
                  disabled={disabled}
                >
                  <Text
                    style={[
                      styles.selectedItems,
                      { backgroundColor: primaryColor },
                      multipleSelectedItemStyle,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                onPress={() => handleToggleModal()}
                disabled={disabled}
              >
                <Text style={[styles.blackText, selectedItemStyle]}>
                  {getSelectedItemsLabel()}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {!selectedItem && selectedItems?.length === 0 && (
            <Text style={styles.blackText}>
              {placeholder ?? 'Select an option'}
            </Text>
          )}
        </ScrollView>
        <View style={styles.iconStyle}>
          <Image source={require('../src/asset/arrow-down.png')} />
        </View>
      </Pressable>

      {error && error !== '' && (
        <Text style={[styles.error, dropdownErrorTextStyle]}>{error}</Text>
      )}

      {helperText && helperText !== '' && !error && (
        <Text style={[styles.helper, dropdownHelperTextStyle]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginBottom: 16, color: colors.gray, ...typography.caption },
  inputFocusErrorState: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.red,
  },
  iconStyle: { position: 'absolute', right: 25, top: 25 },
  error: { color: colors.red, marginTop: 8, ...typography.caption },
  helper: { marginTop: 8, color: colors.primary, ...typography.caption },
  dropdownInputContainer: { marginBottom: 23, width: '100%' },
  selectedItemsContainer: { flexDirection: 'row', flexWrap: 'nowrap' },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  blackText: { color: colors.black },
});

export default Dropdown;
