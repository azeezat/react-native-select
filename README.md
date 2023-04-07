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
For more examples visit our [wiki page](https://github.com/azeezat/react-native-select/wiki)


# iOS
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="529" alt="Screenshot 2023-03-23 at 5 11 54 PM" src="https://user-images.githubusercontent.com/9849221/227392644-a039424a-9bdf-4253-b984-7b043e4a9545.png"> | <img width="529" alt="Screenshot 2023-03-23 at 5 00 19 PM" src="https://user-images.githubusercontent.com/9849221/227391036-44b5e935-bc5e-48d6-a3a9-7a285a4879fd.png"> | <img width="529" alt="Screenshot 2023-03-23 at 5 00 29 PM" src="https://user-images.githubusercontent.com/9849221/227391040-45772980-e51c-4ebf-aabf-30886ff06e7c.png">|
|<img width="529" alt="Screenshot 2023-03-23 at 5 00 35 PM" src="https://user-images.githubusercontent.com/9849221/227391043-9e5fe1aa-86aa-438c-9e84-8c38975d3d57.png"> | <img width="529" alt="Screenshot 2023-03-23 at 5 11 54 PM" src="https://user-images.githubusercontent.com/9849221/227391594-f672b97a-c3c0-466c-b615-a887e4a8a6c0.png">| <img width="529" alt="Screenshot 2023-04-06 at 5 26 46 PM" src="https://user-images.githubusercontent.com/9849221/230516858-b11168be-3144-4914-a31a-15663c5d0404.png">|


# Android
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="456" alt="Screenshot 2023-03-23 at 5 25 07 PM" src="https://user-images.githubusercontent.com/9849221/227393546-3aba8a28-f437-4f8f-9611-bf300c5af8f2.png"> | <img width="456" alt="Screenshot 2023-03-23 at 5 26 58 PM" src="https://user-images.githubusercontent.com/9849221/227393548-28796d7b-9760-43a9-8ed3-fb1618cd1b7d.png"> | <img width="456" alt="Screenshot 2023-03-23 at 5 28 49 PM" src="https://user-images.githubusercontent.com/9849221/227393554-91ed1a92-d229-4814-84d8-5f9095e8d048.png">|


## Props

| Proptypes                 | Datatype            | Example                                                                    |
| ------------------------- | ------------------- | -------------------------------------------------------------------------- |
| label                     | `string`            | `Countries`                                                                |
| placeholder               | `string`            | `Select a country`                                                         |
| options                   | `Array`             | `[{ name: 'Albania', code: 'AL' }, { name: 'Åland Islands', code: 'AX' }]` |
| optionLabel               | `string`            | `name`                                                                     |
| optionValue               | `string`            | `code`                                                                     |
| error                     | `string`            | `This is a required field`                                                 |
| helperText                | `string`            | `Only countries in the east are listed`                                    |
| selectedValue             | `string` or `Array` | `AL` or `[AL, AX]`                                                         |
| onValueChange             | `function`          | `()=>{}`                                                                   |
| isMultiple                | `Boolean`           | `true`                                                                     |
| isSearchable              | `Boolean`           | `true`                                                                     |
| disabled                  | `Boolean`           | `true`                                                                     |
| labelStyle                | `Object`            | `{color: 'red', borderRadius: 0, ...}`                                     |
| dropdownStyle             | `Object`            | `{borderColor: 'blue', margin: 5, borderWidth:0 ...}`                      |
| dropdownContainerStyle    | `Object`            | `{backgroundColor: 'red', width: '30%', ...}`                              |
| searchInputStyle          | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                           |
| selectedItemStyle         | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                           |
| multipleSelectedItemStyle | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                           |
| modalBackgroundStyle      | `Object`            | `{backgroundColor: 'rgba(196, 198, 246, 0.5)'}`                            |
| modalOptionsContainer     | `Object`            | `{padding: 5}`                                                             |
| dropdownErrorStyle        | `Object`            | `{borderWidth: 2, borderStyle: 'solid'}`                                   |
| dropdownErrorTextStyle    | `Object`            | `{color: 'red', fontWeight:'500'}`                                         |
| dropdownHelperTextStyle   | `Object`            | `{color: 'green', fontWeight:'500'}`                                       |
| primaryColor              | `string`            | `blue`                                                                     |
| checkboxSize              | `number`            | `5`                                                                        |
| checkboxStyle             | `Object`            | `{backgroundColor: 'blue', ...}`                                           |
| checkboxLabelStyle        | `Object`            | `{color: 'red', fontWeight:'500'`                                          |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

# Video Demo
https://user-images.githubusercontent.com/9849221/230516294-a1aca5a7-65f5-4d9c-9b7f-a057807cf35f.mov

