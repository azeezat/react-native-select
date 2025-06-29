/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import DropdownSelect from 'react-native-input-select';
import { binIcon, countries } from './data';
import { DropdownSelectHandle } from '../../src/types/index.types';

export default function App() {
  const [user, setUser] = useState<string>('');
  const [country, setCountry] = useState<any>('');
  const [gender, setGender] = useState<number>();
  const [currency, setCurrency] = useState<string[]>([]);
  const [meals, setMeals] = useState<string[]>([]);
  const [item, setItem] = useState<any>('');
  const [menu, setMenu] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<any[]>([
    { label: 0, value: 0 },
    { label: 1, value: false },
    { label: 2, value: 2, disabled: true },
  ]);
  useEffect(() => {
    setCurrency(['NGN']);
    setMenu(['F']);
  }, []);

  const logMovies = async () => {
    console.log('You can make an API call when the modal opens.');
  };

  const dropdownRef = useRef<DropdownSelectHandle | null>(null);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <DropdownSelect
            selectedValue=""
            label="Currency"
            placeholder="Empty State"
            options={[]}
            onValueChange={() => {}}
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
            primaryColor={'deepskyblue'}
            selectedItemsControls={{
              showRemoveIcon: true,
            }}
          />

          <DropdownSelect
            label="Gender"
            placeholder="Select an option..."
            options={[
              {
                name: (
                  <View style={styles.itemStyle}>
                    <Image
                      style={styles.avatarStyle}
                      source={{
                        uri: 'https://robohash.org/13c988d1766741bbe55e1edf78aa84fc?set=set4&bgset=&size=400x400',
                      }}
                    />

                    <Text>Male</Text>
                  </View>
                ),
                id: 0,
              },
              {
                name: (
                  <View style={styles.itemStyle}>
                    <Image
                      style={styles.avatarStyle}
                      source={{
                        uri: 'https://robohash.org/13c988d1766741bbe55e1edf78aa84fc?set=set1&bgset=bg1&size=400x400',
                      }}
                    />

                    <Text>Female</Text>
                  </View>
                ),
                id: 1,
              },
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
            error={gender === undefined ? 'Gender is required' : ''}
            modalControls={{
              modalProps: {
                onShow: () => logMovies(),
                onDismiss: () => console.log('modal was dismissed'),
              },
            }}
            isMultiple
            selectedItemsControls={{
              removeItemIcon: (
                <Image
                  source={{
                    uri: binIcon,
                  }}
                  style={{ tintColor: 'white', height: 12, width: 12 }}
                />
              ),
              onRemoveItem: () => Alert.alert('Item was removed'),
              showRemoveIcon: true,
            }}
          />

          <DropdownSelect
            label="Border has been removed"
            placeholder="Select user"
            options={[
              { label: 'John Doe', value: '12' },
              { label: 'James Bond', value: '13' },
            ]}
            selectedValue={user}
            onValueChange={(itemValue: any) => setUser(itemValue)}
            isSearchable
            primaryColor={'purple'}
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
            }}
            dropdownIcon={
              user && (
                <View style={styles.outerCircle}>
                  <View style={styles.innerCircle} />
                </View>
              )
            }
            dropdownIconStyle={user ? { top: 48, right: 15 } : {}}
            searchControls={{
              textInputStyle: {
                color: 'blue',
                fontWeight: '500',
                minHeight: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                width: '70%',
                textAlign: 'center',
                backgroundColor: 'pink',
              },
              textInputContainerStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              textInputProps: {
                placeholder: 'Search anything here',
                placeholderTextColor: 'white',
              },
            }}
          />

          <DropdownSelect
            label="Meal preferences"
            placeholder="Select your meal preferences"
            options={[
              { name: '🍛 Rice', value: '1', disabled: false },
              { name: '🍗 Chicken', value: '2' },
              { name: '🥦 Brocoli', value: '3', disabled: false },
              { name: '🍕 Pizza', value: '4' },
            ]}
            maxSelectableItems={2}
            optionLabel={'name'}
            optionValue={'value'}
            selectedValue={meals}
            onValueChange={(itemValue: any) => {
              meals.length === 2 && console.log('You can only select 2 meals');

              setMeals(itemValue);
            }}
            dropdownStyle={{
              backgroundColor: 'yellow',
              paddingVertical: 5,
              paddingHorizontal: 5,
              minHeight: 40,
              borderColor: 'green',
            }}
            dropdownIconStyle={{ top: 47, right: 10 }}
            dropdownContainerStyle={{ marginBottom: 40 }}
            dropdownHelperTextStyle={{
              color: 'green',
              fontWeight: '900',
            }}
            modalControls={{
              modalBackgroundStyle: {
                backgroundColor: 'rgba(196, 198, 246, 0.5)',
              },
            }}
            helperText="Some items in this list are disabled"
            isMultiple
            checkboxControls={{
              checkboxStyle: {
                backgroundColor: 'green',
                borderRadius: 30,
                borderColor: 'green',
              },
              checkboxLabelStyle: { color: 'green', fontSize: 20 },
              checkboxUnselectedColor: 'black',
              checkboxComponent: <View style={styles.radioButton} />,
            }}
            listControls={{
              hideSelectAll: true,
            }}
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
            modalControls={{
              modalBackgroundStyle: {
                backgroundColor: 'rgba(196, 198, 246, 0.5)',
              },
            }}
            helperText="The placeholder has been styled"
            checkboxControls={{
              checkboxSize: 15,
              checkboxStyle: {
                backgroundColor: 'purple',
                borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
                padding: 5,
                borderColor: 'red',
              },
              checkboxLabelStyle: { color: 'red', fontSize: 20 },
              checkboxComponent: <View style={styles.radioButton} />,
            }}
            selectedItemStyle={{
              color: 'hotpink',
              fontWeight: '900',
            }}
          />
          <TouchableHighlight
            onPress={() => dropdownRef.current?.open()}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'green',
              marginBottom: 20,
              padding: 3,
            }}
          >
            <Text style={{ color: 'white' }}>
              Open the dropdown below by pressing this component
            </Text>
          </TouchableHighlight>
          <DropdownSelect
            label="Customized components in list"
            placeholder="Select multiple countries..."
            options={countries.slice(0, 30)}
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
            dropdownIconStyle={{ top: 52, right: 15 }}
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
                    title="Close button"
                    onPress={() => dropdownRef.current?.close()}
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
            modalControls={{
              modalOptionsContainerStyle: {
                padding: 10,
                backgroundColor: 'cyan',
              },
              modalProps: {
                supportedOrientations: [
                  'portrait',
                  'portrait-upside-down',
                  'landscape',
                  'landscape-left',
                  'landscape-right',
                ],
                transparent: false,
                onShow: () => logMovies(),
                onDismiss: () => console.log('modal was dismissed'),
              },
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
            listControls={{
              selectAllText: 'Select all that applies',
              unselectAllText: 'Remove everything',
              selectAllCallback: () => Alert.alert('You selected everything'),
              unselectAllCallback: () => Alert.alert('You removed everything'),
              emptyListMessage: 'No record found',
            }}
            ref={dropdownRef}
          />

          {/* Section list */}
          <DropdownSelect
            label="Section list (Water cannot be removed)"
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
                  { label: 'Water', value: 'F', disabled: true },
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
            checkboxControls={{
              checkboxDisabledStyle: {
                borderColor: 'red',
                backgroundColor: 'red',
              },
              checkboxUnselectedColor: 'green',
            }}
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

          {/* Add search item to list */}
          <DropdownSelect
            label="Ingredient"
            placeholder="Select or add ingredients..."
            options={ingredientOptions}
            selectedValue={ingredients}
            onValueChange={(itemValue: any) => setIngredients(itemValue)}
            isMultiple
            isSearchable
            listEmptyComponent={
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}
              >
                <Pressable
                  onPress={() =>
                    setIngredientOptions([
                      ...ingredientOptions,
                      { label: searchTerm, value: searchTerm },
                    ])
                  }
                  style={{
                    backgroundColor: 'blue',
                    borderRadius: 5,
                    width: 120,
                    padding: 5,
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Add ingredient
                  </Text>
                </Pressable>
              </View>
            }
            searchControls={{ searchCallback: value => setSearchTerm(value) }}
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
  outerCircle: {
    borderRadius: 30 / 2,
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: 'green',
    margin: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 5,
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
