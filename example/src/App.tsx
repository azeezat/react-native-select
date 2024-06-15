/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {countries} from './data';

export default function App() {
  const [users, setUsers] = useState<string[]>([]);
  const [country, setCountry] = useState<any>('');
  const [gender, setGender] = useState<number>();
  const [currency, setCurrency] = useState<string[]>([]);
  const [meals, setMeals] = useState<string[]>([]);
  const [item, setItem] = useState<any>('');
  const [menu, setMenu] = useState<string[]>([]);

  useEffect(() => {
    setCurrency(['NGN']);
    setMenu(['F']);
  }, []);

  const logMovies = async () => {
    console.log('You can make an API call when the modal opens.');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <DropdownSelect
            label="Currency"
            placeholder="Empty State"
            options={[]}
            onValueChange={() => {}}
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
            modalControls={{
              modalProps: {
                onShow: () => logMovies(),
                onDismiss: () => console.log('modal was dismissed'), //only works for ios
              },
            }}
          />

          <DropdownSelect
            label="Border has been removed"
            placeholder="Select users"
            options={[
              {label: 'John Doe', value: '12'},
              {label: 'James Bond', value: '13'},
            ]}
            selectedValue={users}
            onValueChange={(itemValue: any) => setUsers(itemValue)}
            isSearchable
            primaryColor={'purple'}
            dropdownStyle={{
              borderWidth: 0, // To remove border, set borderWidth to 0
            }}
            dropdownIcon={
              users && (
                <View style={styles.outerCircle}>
                  <View style={styles.innerCircle} />
                </View>
              )
            }
            dropdownIconStyle={users && {top: 20, right: 15}}
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
              {name: '🍛 Rice', value: '1', disabled: true},
              {name: '🍗 Chicken', value: '2'},
              {name: '🥦 Brocoli', value: '3', disabled: true},
              {name: '🍕 Pizza', value: '4'},
            ]}
            optionLabel={'name'}
            optionValue={'value'}
            selectedValue={meals}
            onValueChange={(itemValue: any) => setMeals(itemValue)}
            dropdownStyle={{
              backgroundColor: 'yellow',
              paddingVertical: 5,
              paddingHorizontal: 5,
              minHeight: 40,
              borderColor: 'green',
            }}
            dropdownIconStyle={{top: 15, right: 10}}
            dropdownContainerStyle={{marginBottom: 40}}
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
              checkboxLabelStyle: {color: 'green', fontSize: 20},
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
              {label: 'Customized Item 1', value: '1'},
              {label: 'Customized Item 2', value: '2'},
            ]}
            selectedValue={item}
            onValueChange={(itemValue: any) => setItem(itemValue)}
            placeholderStyle={{
              color: 'purple',
              fontSize: 15,
              fontWeight: '500',
            }}
            labelStyle={{color: 'teal', fontSize: 15, fontWeight: '500'}}
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
              checkboxLabelStyle: {color: 'red', fontSize: 20},
              checkboxComponent: <View style={styles.radioButton} />,
            }}
            selectedItemStyle={{
              color: 'hotpink',
              fontWeight: '900',
            }}
          />

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
            dropdownIconStyle={{top: 20, right: 20}}
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
          />

          <DropdownSelect
            label="Menu"
            placeholder="Select multiple dishes..."
            options={[
              {
                title: 'Main dishes',
                data: [
                  {label: 'Pizza', value: 'A'},
                  {label: 'Burger', value: 'B'},
                  {label: 'Risotto', value: 'C'},
                ],
              },
              {
                title: 'Sides',
                data: [
                  {label: 'Ice cream', value: 'D', disabled: true},
                  {label: 'Cheesecake', value: 'E'},
                ],
              },
              {
                title: 'Drinks',
                data: [
                  {label: 'Water', value: 'F'},
                  {label: 'Coke', value: 'G'},
                  {label: 'Juice', value: 'H'},
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
});
