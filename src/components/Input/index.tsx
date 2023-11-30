import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Platform } from 'react-native';
import { inputStyles } from '../../styles/input';

export const Input = ({
  placeholder,
  value,
  onChangeText,
  style,
  primaryColor,
  textInputContainerStyle,
  ...rest
}: any) => {
  const [isFocused, setFocus] = useState(false);

  return (
    <View style={[styles.container, textInputContainerStyle]}>
      <TextInput
        placeholder={placeholder}
        style={[
          inputStyles.input,
          Platform.select({
            web: {
              outlineColor: primaryColor,
            },
          }),
          isFocused && { borderColor: primaryColor },
          style,
        ]}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 23 },
});

export default Input;
