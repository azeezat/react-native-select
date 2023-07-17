import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { colors } from '../../styles/colors';
import { inputStyles } from '../../styles/input';

const DropdownSelectedItemsView = ({
  placeholder,
  error,
  getSelectedItemsLabel,
  handleToggleModal,
  isMultiple,
  selectedItem,
  selectedItems,
  dropdownIcon,
  dropdownStyle,
  dropdownIconStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  primaryColor,
  disabled,
}: any) => {
  return (
    <Pressable
      onPress={() => handleToggleModal()}
      style={({ pressed }) => [
        pressed && {
          ...inputStyles.inputFocusState,
          borderColor: primaryColor,
        },
        inputStyles.input,
        dropdownStyle,
        error && //this must be last
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
            getSelectedItemsLabel()?.map((item: any, i: Number) => (
              <Text
                key={`react-native-input-select-${Math.random()}-${i}`}
                style={[
                  styles.selectedItems,
                  { backgroundColor: primaryColor },
                  multipleSelectedItemStyle,
                ]}
              >
                {item}
              </Text>
            ))
          ) : (
            <Text style={[styles.blackText, selectedItemStyle]}>
              {getSelectedItemsLabel()}
            </Text>
          )}
          {!selectedItem && selectedItems?.length === 0 && (
            <Text style={[styles.blackText, placeholderStyle]}>
              {placeholder ?? 'Select an option'}
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={[styles.iconStyle, dropdownIconStyle]}>
        {dropdownIcon || (
          <Image source={require('../../asset/arrow-down.png')} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconStyle: { position: 'absolute', right: 25, top: 25 },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
    overflow: 'hidden',
  },
  blackText: { color: colors.black },
});

export default DropdownSelectedItemsView;
