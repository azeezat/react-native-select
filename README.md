[![CodeQL](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml/badge.svg)](https://github.com/azeezat/react-native-select/actions/workflows/codeql.yml)

# react-native-input-select

|A fully customizable dropdown selection package for react-native android and iOS with multiple select and search capabilities.

## Installation

With npm
```sh
npm install react-native-input-select
```
With yarn

```sh
yarn add react-native-input-select
```

## Demo

<div align="center">
  <video src="https://user-images.githubusercontent.com/9849221/226240418-efa4fe9f-4055-4c03-888e-8b7093adcd63.mov" width=400/>
<div/>
```
```
  
## Basic Usage

For more examples visit our (wiki page)[https://github.com/azeezat/react-native-select/wiki]

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
