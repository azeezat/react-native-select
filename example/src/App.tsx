/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropdownSelect from 'react-native-input-select';

export default function App() {
  const [country, setCountry] = React.useState<any>('');
  const [gender, setGender] = React.useState<any>('');
  const [currency, setCurrency] = React.useState<any>('');
  const [item, setItem] = React.useState<any>('');

  return (
    <View style={styles.container}>
      <DropdownSelect
        label="Country"
        placeholder="Select multiple options..."
        options={[
          {name: 'Albania', code: 'AL'},
          {name: 'Åland Islands', code: 'AX'},
          {name: 'Algeria', code: 'DZ'},
          {name: 'American Samoa', code: 'AS'},
          {name: 'Andorra', code: 'AD'},
          {name: 'Angola', code: 'AO'},
          {name: 'Anguilla', code: 'AI'},
          {name: 'Antarctica', code: 'AQ'},
          {name: 'Antigua and Barbuda', code: 'AG'},
        ]}
        optionLabel={'name'}
        optionValue={'code'}
        selectedValue={country}
        onValueChange={(itemValue: any) => setCountry(itemValue)}
        isMultiple
        isSearchable
        primaryColor={'deepskyblue'}
      />

      <DropdownSelect
        label="Gender"
        placeholder="Select an option..."
        options={[
          {name: 'Male', id: '1'},
          {name: 'Female', id: '2'},
        ]}
        optionLabel={'name'}
        optionValue={'id'}
        selectedValue={gender}
        onValueChange={(itemValue: any) => setGender(itemValue)}
        dropdownErrorStyle={{
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
        }}
        dropdownErrorTextStyle={{color: 'red', fontWeight: '500'}}
        error={gender ? '' : 'Gender is required'}
        primaryColor={'green'}
      />

      <DropdownSelect
        label="Currency"
        placeholder="Select multiple currencies..."
        options={[
          {name: 'Naira (NGN) \u20A6', code: 'NGN'},
          {name: 'Dollar (USD) \u0024', code: 'USD'},
          {name: 'Euro (EUR) \u20AC', code: 'EUR'},
        ]}
        optionLabel={'name'}
        optionValue={'code'}
        selectedValue={currency}
        onValueChange={(itemValue: any) => setCurrency(itemValue)}
        isMultiple
        isSearchable
        multipleSelectedItemStyle={{borderRadius: 5}}
      />

      <DropdownSelect
        label="Item"
        placeholder="Select an item..."
        options={[
          {name: 'Male', value: '1'},
          {name: 'Female', value: '2'},
        ]}
        optionLabel={'name'}
        optionValue={'value'}
        selectedValue={item}
        onValueChange={(itemValue: any) => setItem(itemValue)}
        labelStyle={{color: 'teal', fontSize: 15, fontWeight: '500'}}
        dropdownHelperTextStyle={{
          color: 'green',
          fontWeight: '900',
        }}
        modalBackgroundStyle={{backgroundColor: 'rgba(196, 198, 246, 0.5)'}}
        helperText="This is an helper text"
        checkboxSize={20}
        checkboxStyle={{backgroundColor: 'red', borderRadius: 5}}
        checkboxLabelStyle={{color: 'red', fontSize: 30}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
});
