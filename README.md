# react-native-input-select

A customizable dropdown selection package for react-native for android and iOS with multiple select and search capabilities.

## Installation

```sh
npm install react-native-input-select
yarn add react-native-input-select
```

## Demo

|    Multiple Select           | Single Select                                | Search |
| :-------------: | :-----------------: | :----------------------------:|
| <video src='https://user-images.githubusercontent.com/9849221/148039859-9eb4ef87-60ca-4300-9899-fbe81dcb0fb6.mov' width=90/> | <video src='https://user-images.githubusercontent.com/9849221/148039800-9c30509a-6115-415e-aa3c-0402d64ec578.mov' width=90/> | <video src='https://user-images.githubusercontent.com/9849221/148668734-a48aad4d-99bb-4942-a167-561ed59fe38e.mov' width=90/> |





## Usage

```js
import React from 'react';
import Dropdown from 'react-native-input-select';

export default function App() {
  const [country, setCountry] = React.useState<number | undefined>();

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
| labelStyle                | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                           |
| dropdownStyle             | `Object`            | `{borderColor: 'blue', margin: 5, borderWidth:0 ...}`                      |
| dropdownContainerStyle    | `Object`            | `{backgroundColor: 'red', width: '30%', ...}`                              |
| searchInputStyle          | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                           |
| selectedItemStyle         | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                           |
| multipleSelectedItemStyle | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                           |
| modalBackgroundStyle      | `Object`            | `{backgroundColor: 'blue', ...}`                                           |
| modalOptionsContainer     | `Object`            | `{padding: 5}`                                                             |
| dropdownErrorStyle        | `Object`            | `{borderWidth: 2, borderStyle: 'solid'}`                                   |
| dropdownErrorTextStyle    | `Object`            | `{color: 'red', fontWeight:500}`                                           |
| dropdownHelperTextStyle   | `Object`            | `{color: 'green', fontWeight:500}`                                         |
| primaryColor              | `string`            | `blue`                                                                     |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
