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
  const [users, setUsers] = useState<any>('');
  const [country, setCountry] = useState<any>('');
  const [gender, setGender] = useState<any>('');
  const [currency, setCurrency] = useState<any>('');
  const [meals, setMeals] = useState<any>('');
  const [item, setItem] = useState<any>('');
  const [menu, setMenu] = useState<any>('');

  useEffect(() => {
    setCurrency(['NGN']);
    setMenu(['F']);
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
            label="Border has been removed"
            placeholder="Select users"
            options={[
              { label: 'John Doe', value: '12' },
              { label: 'James Bond', value: '13' },
            ]}
            selectedValue={users}
            onValueChange={(itemValue: any) => setUsers(itemValue)}
            isMultiple
            isSearchable
            primaryColor={'purple'}
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
            }}
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
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
              backgroundColor: 'yellow',
            }}
            dropdownContainerStyle={{ marginBottom: 40 }}
            dropdownHelperTextStyle={{
              color: 'green',
              fontWeight: '900',
            }}
            modalBackgroundStyle={{
              backgroundColor: 'rgba(196, 198, 246, 0.5)',
            }}
            helperText="Some items in this list are disabled"
            isMultiple
          />

          <DropdownSelect
            label="This label has been styled"
            placeholder="Select an item..."
            options={[
              { label: 'Customized Item 1', value: '1' },
              { label: 'Customized Item 2', value: '2' },
            ]}
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
            checkboxComponentStyles={{
              checkboxSize: 20,
              checkboxStyle: {
                backgroundColor: 'purple',
                borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
                padding: 10,
                borderColor: 'red',
              },
              checkboxLabelStyle: { color: 'red', fontSize: 20 },
            }}
          />

          <DropdownSelect
            label="Customized components in list"
            placeholder="Select multiple options..."
            options={countries.slice(0, 2)}
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
              supportedOrientations: [
                'portrait',
                'portrait-upside-down',
                'landscape',
                'landscape-left',
                'landscape-right',
              ],
              transparent: false,
            }}
            listComponentStyles={{
              listEmptyComponentStyle: {
                color: 'red',
              },
              itemSeparatorStyle: {
                opacity: 0,
                borderColor: 'white',
                borderWidth: 2,
                backgroundColor: 'cyan',
              },
              sectionHeaderStyle: {
                padding: 10,
                backgroundColor: 'cyan',
              },
            }}
          />

          <DropdownSelect
            label="Menu"
            placeholder="Select multiple dishes..."
            options={[
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
                  { label: 'Ice cream', value: 'D', disabled: true },
                  { label: 'Cheesecake', value: 'E' },
                ],
              },
              {
                title: 'Drinks',
                data: [
                  { label: 'Water', value: 'F' },
                  { label: 'Coke', value: 'G' },
                  { label: 'Juice', value: 'H' },
                ],
              },
            ]}
            selectedValue={menu}
            onValueChange={(itemValue: any) => setMenu(itemValue)}
            isMultiple
            isSearchable
            primaryColor={'#1c2d6b'}
            listComponentStyles={{
              sectionHeaderStyle: {
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: '#1c2d6b',
                color: 'white',
                borderRadius: 6,
                overflow: 'hidden',
              },
            }}
            multipleSelectedItemStyle={{
              borderRadius: 0,
              backgroundColor: 'hotpink',
              color: 'black',
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
