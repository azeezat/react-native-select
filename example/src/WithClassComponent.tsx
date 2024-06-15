import React from 'react';
import {View, StyleSheet} from 'react-native';
import DropdownSelect from 'react-native-input-select';

// Define the type for our component props
interface MyComponentProps {}

// Define the type for our component state
interface MyComponentState {
  country: any[];
}

// Class component
class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      country: [],
    };
  }

  // Event handler
  setCountry(country: any) {
    this.setState({
      country,
    });
  }

  render() {
    const {country} = this.state;

    return (
      <View style={styles.container}>
        <DropdownSelect
          label="Country"
          placeholder="Select multiple options..."
          options={[
            {name: 'Nigeria', code: 'NG'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
          ]}
          optionLabel={'name'}
          optionValue={'code'}
          selectedValue={country}
          onValueChange={(itemValue: any) => this.setCountry(itemValue)}
          isMultiple
          isSearchable
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;
