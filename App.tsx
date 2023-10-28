import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Tabs from './src/components/Tabs';
function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs></Tabs>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
