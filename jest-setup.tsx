import '@testing-library/react-native/extend-expect';
import '@testing-library/jest-dom';

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }: any) => <View>{children}</View>,
    SafeAreaView: ({ children }: any) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});