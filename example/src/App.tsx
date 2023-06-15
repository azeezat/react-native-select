/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
} from 'react-native';
import DropdownSelect from 'react-native-input-select';
import { countries } from './data';

export default function App() {
  const [country, setCountry] = useState<any>('');
  const [gender, setGender] = useState<any>('');
  const [currency, setCurrency] = useState<any>('');
  const [meals, setMeals] = useState<any>('');
  const [item, setItem] = useState<any>('');

  useEffect(() => {
    setCountry(['NG']);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <DropdownSelect
            label="Currency"
            placeholder="Select multiple currencies..."
            options={[
              { name: 'Naira (NGN) \u20A6', code: 'NGN' },
              { name: 'Dollar (USD) \u0024', code: 'USD' },
              { name: 'Euro (EUR) \u20AC', code: 'EUR' },
            ]}
            optionLabel={'name'}
            optionValue={'code'}
            selectedValue={currency}
            onValueChange={(itemValue: any) => setCurrency(itemValue)}
            isMultiple
            isSearchable
            primaryColor={'deepskyblue'}
          />

          <DropdownSelect
            label="Border has been removed"
            placeholder="Select multiple options..."
            options={countries}
            optionLabel={'name'}
            optionValue={'code'}
            selectedValue={country}
            onValueChange={(itemValue: any) => setCountry(itemValue)}
            isMultiple
            isSearchable
            primaryColor={'purple'}
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
            }}
          />

          <DropdownSelect
            label="Gender"
            placeholder="Select an option..."
            options={[
              { name: 'Male', id: '1' },
              { name: 'Female', id: '2' },
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
            dropdownErrorTextStyle={{ color: 'red', fontWeight: '500' }}
            error={gender ? '' : 'Gender is required'}
            primaryColor={'green'}
          />

          <DropdownSelect
            label="Meal preferences"
            placeholder="Select your meal preferences"
            options={[
              { name: '🍛 Rice', value: '1', disabled: true },
              { name: '🍗 Chicken', value: '2' },
              { name: '🥦 Brocoli', value: '3', disabled: true },
              { name: '🍕 Pizza', value: '4' },
            ]}
            optionLabel={'name'}
            optionValue={'value'}
            selectedValue={meals}
            onValueChange={(itemValue: any) => setMeals(itemValue)}
            dropdownHelperTextStyle={{
              color: 'green',
              fontWeight: '900',
            }}
            modalBackgroundStyle={{
              backgroundColor: 'rgba(196, 198, 246, 0.5)',
            }}
            helperText="Some items in this list are disabled"
            checkboxSize={20}
            isMultiple
          />

          <DropdownSelect
            label="Currency"
            placeholder="Select multiple currencies..."
            options={[
              { name: 'Naira (NGN) \u20A6', code: 'NGN' },
              { name: 'Dollar (USD) \u0024', code: 'USD' },
              { name: 'Euro (EUR) \u20AC', code: 'EUR' },
            ]}
            optionLabel={'name'}
            optionValue={'code'}
            selectedValue={currency}
            onValueChange={(itemValue: any) => setCurrency(itemValue)}
            isMultiple
            isSearchable
            multipleSelectedItemStyle={{ borderRadius: 5 }}
          />

          <DropdownSelect
            label="This label has been styled"
            placeholder="Select an item..."
            options={[
              { name: 'Customized Item 1', value: '1' },
              { name: 'Customized Item 2', value: '2' },
            ]}
            optionLabel={'name'}
            optionValue={'value'}
            selectedValue={item}
            onValueChange={(itemValue: any) => setItem(itemValue)}
            placeholderStyle={{
              color: 'purple',
              fontSize: 15,
              fontWeight: '500',
            }}
            labelStyle={{ color: 'teal', fontSize: 15, fontWeight: '500' }}
            dropdownHelperTextStyle={{
              color: 'green',
              fontWeight: '900',
            }}
            modalBackgroundStyle={{
              backgroundColor: 'rgba(196, 198, 246, 0.5)',
            }}
            helperText="The placeholder has been styled"
            checkboxSize={20}
            checkboxStyle={{
              backgroundColor: 'purple',
              borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
              padding: 10,
            }}
            checkboxLabelStyle={{ color: 'red', fontSize: 30 }}
          />

          <DropdownSelect
            label="Customized components in list"
            placeholder="Select multiple options..."
            options={countries}
            optionLabel={'name'}
            optionValue={'code'}
            selectedValue={country}
            onValueChange={(itemValue: any) => setCountry(itemValue)}
            isMultiple
            isSearchable
            primaryColor={'orange'}
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
            }}
            dropdownIcon={
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
              />
            }
            dropdownIconStyle={{ top: 20, right: 20 }}
            listHeaderComponent={
              <View style={styles.customComponentContainer}>
                <Text style={styles.text}>
                  💡 You can add any component to the top of this list
                </Text>
                <View style={styles.fixToText}>
                  <Button
                    title="Left button"
                    onPress={() => Alert.alert('Left button pressed')}
                    color="#007AFF"
                  />
                  <Button
                    title="Right button"
                    onPress={() => Alert.alert('Right button pressed')}
                  />
                </View>
              </View>
            }
            listFooterComponent={
              <View style={styles.customComponentContainer}>
                <Text>
                  You can add any component to the bottom of this list
                </Text>
              </View>
            }
            modalOptionsContainerStyle={{
              padding: 10,
              backgroundColor: 'cyan',
            }}
            modalProps={{
              supportedOrientations: ['landscape-left', 'landscape-right'],
              transparent: false
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  customComponentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    marginBottom: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});
