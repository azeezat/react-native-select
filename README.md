# react-native-select

Dropdown package for react-native.
Works perfectly on android and iOS.

## Installation

```sh
npm install react-native-select
```

## Demo

|                                                       Multiple Select                                                        |                                                        Single Select                                                         |
| :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| <video src='https://user-images.githubusercontent.com/9849221/148039859-9eb4ef87-60ca-4300-9899-fbe81dcb0fb6.mov' width=90/> | <video src='https://user-images.githubusercontent.com/9849221/148039800-9c30509a-6115-415e-aa3c-0402d64ec578.mov' width=90/> |

## Usage

```js
import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import DropdownSelect from 'react-native-select';

export default function App() {
  const [country, setCountry] = React.useState<number | undefined>();

  return (
      <DropdownSelect
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

| Proptypes              | Datatype            | Example                                                                    |
| ---------------------- | ------------------- | -------------------------------------------------------------------------- |
| label                  | `string`            | `Countries`                                                                |
| placeholder            | `string`            | `Select a country`                                                         |
| options                | `Array`             | `[{ name: 'Albania', code: 'AL' }, { name: 'Åland Islands', code: 'AX' }]` |
| optionLabel            | `string`            | `name`                                                                     |
| optionValue            | `string`            | `code`                                                                     |
| selectedValue          | `string` or `Array` | `AL` or `[AL, AX]`                                                         |
| onValueChange          | `function`          | `()=>{}`                                                                   |
| isMultiple             | `Boolean`           | `true`                                                                     |
| isSearchable           | `Boolean`           | `true`                                                                     |
| labelStyle             | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                           |
| dropdownStyle          | `Object`            | `{backgroundColor: 'red', margin: 5, ...}`                                 |
| dropdownContainerStyle | `Object`            | `{backgroundColor: 'red', borderRadius: 0, ...}`                           |
| selectedItemStyle      | `Object`            | `{backgroundColor: 'red', color: 'yellow', ...}`                           |
| modalBackgroundStyle   | `Object`            | `{backgroundColor: 'blue', ...}`                                           |
| modalOptionsContainer  | `Object`            | `{padding: 5}`                                                             |
| primaryColor           | `string`            | `blue`                                                                     |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
