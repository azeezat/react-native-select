[![CodeQL](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml/badge.svg)](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml)

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
        { name: 'Albania', code: 'AL' },
        { name: 'Åland Islands', code: 'AX' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'Andorra', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antarctica', code: 'AQ' },
        { name: 'Antigua and Barbuda', code: 'AG' },
      ]}
      optionLabel={'name'}
      optionValue={'code'}
      selectedValue={country}
      onValueChange={(value) => setCountry(value)}
      primaryColor={'green'}
    />
  );
}
```

## Advanced Usage

```js
import React from 'react';
import Dropdown from 'react-native-input-select';
import { View, StyleSheet, Text, Button, Alert, Image } from 'react-native';

export default function App() {
  const [country, setCountry] = React.useState();

  return (
    <Dropdown
      label="Customized components in list"
      placeholder="Select multiple options..."
      options={countries.slice(0, 3)}
      optionLabel={'name'}
      optionValue={'code'}
      selectedValue={country}
      onValueChange={(itemValue: any) => setCountry(itemValue)}
      isMultiple
      primaryColor={'orange'}
      dropdownStyle={{
        borderWidth: 0, // To remove border, set borderWidth to 0
      }}
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
      modalOptionsContainerStyle={{ padding: 10, backgroundColor: 'cyan' }}
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
});
```

For more examples visit our [wiki page](https://github.com/azeezat/react-native-select/wiki)

# iOS

|                                                                                                                                                                         |                                                                                                                                                                        |                                                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="529" alt="Screenshot 2023-04-18 at 10 06 15 AM" src="https://user-images.githubusercontent.com/9849221/232854077-d5f8436a-55d8-4826-af44-5a7d47626765.png"> | <img width="529" alt="Screenshot 2023-03-23 at 5 00 19 PM" src="https://user-images.githubusercontent.com/9849221/227391036-44b5e935-bc5e-48d6-a3a9-7a285a4879fd.png"> | <img width="529" alt="Screenshot 2023-03-23 at 5 00 29 PM" src="https://user-images.githubusercontent.com/9849221/227391040-45772980-e51c-4ebf-aabf-30886ff06e7c.png"> |
| <img width="529" alt="Screenshot 2023-03-23 at 5 00 35 PM" src="https://user-images.githubusercontent.com/9849221/227391043-9e5fe1aa-86aa-438c-9e84-8c38975d3d57.png">  | <img width="529" alt="Screenshot 2023-03-23 at 5 11 54 PM" src="https://user-images.githubusercontent.com/9849221/227391594-f672b97a-c3c0-466c-b615-a887e4a8a6c0.png"> | <img width="529" alt="Screenshot 2023-04-06 at 5 26 46 PM" src="https://user-images.githubusercontent.com/9849221/230516858-b11168be-3144-4914-a31a-15663c5d0404.png"> |

# Android

|                                                                                                                                                                      |                                                                                                                                                                        |                                                                                                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="456" alt="Screenshot 2023-05-16 at 6 17 09 AM" src="https://github.com/azeezat/react-native-select/assets/9849221/d695657f-d840-4368-b841-42af479d6543"> | <img width="456" alt="Screenshot 2023-03-23 at 5 26 58 PM" src="https://user-images.githubusercontent.com/9849221/227393548-28796d7b-9760-43a9-8ed3-fb1618cd1b7d.png"> | <img width="456" alt="Screenshot 2023-03-23 at 5 28 49 PM" src="https://user-images.githubusercontent.com/9849221/227393554-91ed1a92-d229-4814-84d8-5f9095e8d048.png"> |

## Props

| Proptypes                  | Datatype            | Example                                                              |
| -------------------------- | ------------------- | -------------------------------------------------------------------- |
| label                      | `string`            | `Countries`                                                          |
| placeholder                | `string`            | `Select a country`                                                   |
| options                    | `Array`             | `[{ name: 'Nigeria', code: 'NG' }, { name: 'Albania', code: 'AL' }]` |
| optionLabel                | `string`            | `name`                                                               |
| optionValue                | `string`            | `code`                                                               |
| error                      | `string`            | `This is a requiredfield`                                            |
| helperText                 | `string`            | `Only few countries are listed`                                      |
| selectedValue              | `string` or `Array` | `AL` or `[AL, AX]`                                                   |
| onValueChange              | `function`          | `()=>{}`                                                             |
| isMultiple                 | `Boolean`           | `true`                                                               |
| isSearchable               | `Boolean`           | `true`                                                               |
| disabled                   | `Boolean`           | `true`                                                               |
| dropdownIcon               | `React Component`   | `Image` or `<Text> Show <Text>`                                      |
| labelStyle                 | `Object`            | `{color: 'red', fontSize: 15, fontWeight: '500'}`                    |
| placeholderStyle           | `Object`            | `{color: 'blue', fontSize: 15, fontWeight: '500'}`                   |
| dropdownStyle              | `Object`            | `{borderColor: 'blue', margin: 5, borderWidth:0 ...}`                |
| dropdownContainerStyle     | `Object`            | `{backgroundColor: 'red', width: '30%', ...}`                        |
| dropdownIconStyle          | `Object`            | `{top: 10 , right: 10, ...}`                                         |
| searchInputStyle           | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                     |
| selectedItemStyle          | `Object`            | `{fontWeight: '600', color: 'yellow', ...}`                          |
| multipleSelectedItemStyle  | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                     |
| modalBackgroundStyle       | `Object`            | `{backgroundColor: 'rgba(196, 198, 246, 0.5)'}`                      |
| modalOptionsContainerStyle | `Object`            | `{padding: 10, backgroundColor: 'cyan',}`                            |
| dropdownErrorStyle         | `Object`            | `{borderWidth: 2, borderStyle: 'solid'}`                             |
| dropdownErrorTextStyle     | `Object`            | `{color: 'red', fontWeight:'500'}`                                   |
| dropdownHelperTextStyle    | `Object`            | `{color: 'green', fontWeight:'500'}`                                 |
| primaryColor               | `string`            | `blue`                                                               |
| checkboxSize               | `number`            | `20`                                                                 |
| checkboxStyle              | `Object`            | `{backgroundColor: 'blue', borderRadius: 30, padding: 10}`           |
| checkboxLabelStyle         | `Object`            | `{color: 'red', fontWeight:'500'}`                                   |
| listHeaderComponent        | `React Component`   | `<Text> You can add any component here`                              |
| listFooterComponent        | `React Component`   | `<Text> You can add any component here`                              |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

# Video Demo

https://user-images.githubusercontent.com/9849221/232344214-55fa5557-cfdd-42c4-a334-f93c15341b0b.mov
