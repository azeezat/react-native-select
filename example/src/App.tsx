import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import DropdownSelect from 'react-native-select';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>(null);

  return (
    <View style={styles.container}>
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
        onValueChange={(itemValue: any) => setResult(itemValue)}
        isMultiple
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
