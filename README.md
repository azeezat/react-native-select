[![NPM](https://nodei.co/npm/react-native-input-select.png?downloads=true)](https://nodei.co/npm/react-native-input-select/)

[![npm version](https://badge.fury.io/js/react-native-input-select.svg)](https://badge.fury.io/js/react-native-input-select) [![GitHub stars](https://img.shields.io/github/stars/azeezat/react-native-select?style=social)](https://github.com/azeezat/react-native-select/stargazers) [![CodeQL](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml/badge.svg)](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml) [![Release & Publish to NPM](https://github.com/azeezat/react-native-select/actions/workflows/release-and-publish-to-npm.yml/badge.svg)](https://github.com/azeezat/react-native-select/actions/workflows/release-and-publish-to-npm.yml)
[![coverage](https://github.com/azeezat/react-native-select/actions/workflows/coverage.yml/badge.svg)](https://github.com/azeezat/react-native-select/actions/workflows/coverage.yml)

# react-native-input-select

A fully customizable dropdown selection package for react-native android and iOS with multiple select and search capabilities.

## Installation

With npm

```sh
npm install react-native-input-select
```

With yarn

```sh
yarn add react-native-input-select
```

## Sandbox

See more examples in [Sandbox](https://azeezat.github.io/react-native-select/)

# iOS

|                                                                                                                                                                       |                                                                                                                                                                       |                                                                                                                                                                       |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="529" alt="Screenshot 2023-07-08 at 12 34 23 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/5bf518bc-573e-4db8-90ec-7ad061e4f3d7"> | <img width="499" alt="Screenshot 2023-07-08 at 12 39 51 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/9d42460f-e4ec-48d0-960d-bb3bcd76331e"> | <img width="529" alt="Screenshot 2023-07-08 at 12 29 16 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/81bde8f7-b88b-4c11-bd3e-33ff2dbb0628"> |
| <img width="529" alt="Screenshot 2023-07-08 at 12 28 57 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/46627375-cb28-4ae1-827f-a0ba84817faa"> | <img width="529" alt="Screenshot 2023-07-08 at 12 20 52 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/bf42254d-3c3d-4f0f-9730-a6263136f78e"> | <img width="529" alt="Screenshot 2023-07-08 at 12 21 06 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/a572d625-dc65-4bf3-8b07-0e057cc8739b"> |

# Android

|                                                                                                                                                                      |                                                                                                                                                                        |                                                                                                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="456" alt="Screenshot 2023-05-16 at 6 17 09 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/d695657f-d840-4368-b841-42af479d6543"> | <img width="456" alt="Screenshot 2023-03-23 at 5 26 58 PM" src="https://user-images.githubusercontent.com/9849221/227393548-28796d7b-9760-43a9-8ed3-fb1618cd1b7d.png"> | <img width="456" alt="Screenshot 2023-03-23 at 5 28 49 PM" src="https://user-images.githubusercontent.com/9849221/227393554-91ed1a92-d229-4814-84d8-5f9095e8d048.png"> |

## Basic Usage

```js
import React from 'react';
import Dropdown from 'react-native-input-select';

export default function App() {
  const [country, setCountry] = React.useState();

  return (
    <Dropdown
      label="Country"
      placeholder="Select an option..."
      options={[
        { label: 'Nigeria', value: 'NG' },
        { label: 'Åland Islands', value: 'AX' },
        { label: 'Algeria', value: 'DZ' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Andorra', value: 'AD' },
      ]}
      selectedValue={country}
      onValueChange={(value) => setCountry(value)}
      primaryColor={'green'}
    />
  );
}
```

## Advanced Usage With Flat List

```js
import React from 'react';
import Dropdown from 'react-native-input-select';
import { View, StyleSheet, Text, Button, Alert, Image } from 'react-native';

export default function App() {
  const [country, setCountry] = React.useState();

  return (
    <Dropdown
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
          <Text>You can add any component to the bottom of this list</Text>
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
        selectAllText: 'Choose everything',
        unselectAllText: 'Remove everything',
        selectAllCallback: () => Alert.alert('You selected everything'),
        unselectAllCallback: () => Alert.alert('You removed everything'),
        emptyListMessage: 'No record found',
      }}
      selectedItemsControls={{
        removeItemIcon: (
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA',
            }}
            style={{ tintColor: 'white', height: 12, width: 12 }}
          />
        ),
        onRemoveItem: () => Alert.alert('Item was removed'),
        showRemoveIcon: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
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
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
  },
});
```

## Advanced Usage with Section List

```js
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
        { label: 'Ice cream', value: 'D' },
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
  primaryColor={'deepskyblue'}
  listComponentStyles={{
    sectionHeaderStyle: {
      padding: 10,
      backgroundColor: 'green',
      color: 'white',
      width: '30%',
    },
  }}
/>
```

For more examples visit our [wiki page](https://github.com/azeezat/react-native-select/wiki)

## Props

| Proptypes                 | Datatype                                     | Example                                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| label                     | `string` or `ReactComponent`                 | Countries or `<Text> You can add any component here <Text>`                                                                                                                                                                    |
| placeholder               | `string`                                     | Select a country                                                                                                                                                                                                               |
| options                   | `Array`                                      | `[{ name: 'Nigeria', code: 'NG' }, { name: 'Albania', code: 'AL' }]`                                                                                                                                                           |
| optionLabel               | `string`                                     | `name`                                                                                                                                                                                                                         |
| optionValue               | `string`                                     | `code`                                                                                                                                                                                                                         |
| error                     | `string`                                     | `This is a requiredfield`                                                                                                                                                                                                      |
| helperText                | `string`                                     | `Only few countries are listed`                                                                                                                                                                                                |
| selectedValue             | `string` or `Array`                          | `AL` or `[AL, AX]`                                                                                                                                                                                                             |
| onValueChange             | `function`                                   | `()=>{}`                                                                                                                                                                                                                       |
| isMultiple                | `Boolean`                                    | `true`                                                                                                                                                                                                                         |
| isSearchable              | `Boolean`                                    | `true`                                                                                                                                                                                                                         |
| disabled                  | `Boolean`                                    | `true`                                                                                                                                                                                                                         |
| dropdownIcon              | `React Component`                            | `Image` or `<Text> Show <Text>`                                                                                                                                                                                                |
| labelStyle                | `Object`                                     | `{color: 'red', fontSize: 15, fontWeight: '500'}`                                                                                                                                                                              |
| placeholderStyle          | `Object`                                     | `{color: 'blue', fontSize: 15, fontWeight: '500'}`                                                                                                                                                                             |
| dropdownStyle             | `Object`                                     | `{borderColor: 'blue', margin: 5, borderWidth:0 ...}`                                                                                                                                                                          |
| dropdownContainerStyle    | `Object`                                     | `{backgroundColor: 'red', width: '30%', ...}`                                                                                                                                                                                  |
| dropdownIconStyle         | `Object`                                     | `{top: 10 , right: 10, ...}`                                                                                                                                                                                                   |
| selectedItemStyle         | `Object`                                     | `{fontWeight: '600', color: 'yellow', ...}`                                                                                                                                                                                    |
| multipleSelectedItemStyle | `Object`                                     | `{backgroundColor: 'red', color: 'yellow', ...}`                                                                                                                                                                               |
| dropdownErrorStyle        | `Object`                                     | `{borderWidth: 2, borderStyle: 'solid'}`                                                                                                                                                                                       |
| dropdownErrorTextStyle    | `Object`                                     | `{color: 'red', fontWeight:'500'}`                                                                                                                                                                                             |
| dropdownHelperTextStyle   | `Object`                                     | `{color: 'green', fontWeight:'500'}`                                                                                                                                                                                           |
| primaryColor              | `string`                                     | `blue`                                                                                                                                                                                                                         |
| autoCloseOnSelect         | `boolean`                                    | `false`                                                                                                                                                                                                                        |
| listHeaderComponent       | `React Component`                            | `<Text> You can add any component here </Text>`                                                                                                                                                                                |
| listFooterComponent       | `React Component`                            | `<Text> You can add any component here <Text>`                                                                                                                                                                                 |
| listComponentStyles       | `Object`                                     | `{listEmptyComponentStyle: ViewStyle, itemSeparatorStyle: ViewStyle, sectionHeaderStyle: TextStyle}`                                                                                                                           |
| listEmptyComponent        | `React Component`                            | `<Text> You can add any component here <Text>`                                                                                                                                                                                 |
| checkboxControls          | `Object`                                     | `{checkboxSize: number, checkboxStyle: ViewStyle, checkboxLabelStyle: TextStyle, checkboxComponent?: React.ReactNode, checkboxDisabledStyle?: ViewStyle, checkboxUnselectedColor?: ColorValue}`                                |
| listControls              | `Object`                                     | `{ selectAllText: 'Choose all', unselectAllText: 'Remove all', selectAllCallback: () => {}, unselectAllCallback: () => {}, hideSelectAll: boolean, emptyListMessage: 'No record found', keyboardShouldPersistTaps: "always" }` |
| searchControls            | `Object`                                     | `{ textInputStyle: ViewStyle \| TextStyle,  textInputContainerStyle: ViewStyle, textInputProps: TextInputProps, searchCallback:(value)=>{}}`                                                                                   |
| modalControls             | `Object`                                     | `{ modalBackgroundStyle: ViewStyle, modalOptionsContainerStyle: ViewStyle, modalProps: ModalProps}`                                                                                                                            |
| minSelectableItems        | `number`                                     | 3                                                                                                                                                                                                                              |
| maxSelectableItems        | `number`                                     | 5                                                                                                                                                                                                                              |
| selectedItemsControls     | `Object`                                     | `{ removeItemIcon: ReactNode, onRemoveItem: ()=>{}, showRemoveIcon: boolean}`                                                                                                                                                  |
| ref                       | `useRef<DropdownSelectHandle \| null>(null)` | Use this to open or close the modal as needed e.g dropdownRef.current?.open() or dropdownRef.current?.close()                                                                                                                  |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<a href="https://github.com/azeezat/react-native-select/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=azeezat/react-native-select" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## Discussion

For discussion and feedback on this library. You can access it by heading over to the [Discussions Tab on Github](https://github.com/azeezat/react-native-select/discussions). We've created some sections to keep the discussion focused.

| Title                                                                                                   | Topic                                                                |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Announcements 📣](https://github.com/azeezat/react-native-select/discussions/categories/announcements) | General announcements about this library.                            |
| [Show and tell 🙌](https://github.com/azeezat/react-native-select/discussions/categories/show-and-tell) | Show off something you've made out of this library                   |
| [Ideas 💡](https://github.com/azeezat/react-native-select/discussions/categories/ideas)                 | A place to Share ideas for new features.                             |
| [Polls 🗳️](https://github.com/azeezat/react-native-select/discussions/categories/polls)                 | Take a vote from the community                                       |
| [Q&A 🤝](https://github.com/azeezat/react-native-select/discussions/categories/q-a)                     | A place to ask the community for help on the New Architecture topics |
| [General 💬](https://github.com/azeezat/react-native-select/discussions/categories/general)             | Chat about anything and everything here                              |

## License

MIT

# Video Demo

https://github.com/azeezat/react-native-select/assets/9849221/194bf5cf-1a2d-4ca6-9585-05d6bb987aba
