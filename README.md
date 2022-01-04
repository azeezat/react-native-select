# react-native-select

Dropdown package for react-native

## Installation

```sh
npm install react-native-select
```

## Usage

```js
import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import DropdownSelect from 'react-native-select';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

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
        selectedValue={result}
        onValueChange={(itemValue) => setResult(itemValue)}
      />
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
