import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Tabs from './src/components/Tabs';
import FavoritesContextProvider from './src/contexts/FavoritesContext';
function App(): JSX.Element {
  return (
    <FavoritesContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tabs></Tabs>
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesContextProvider>
  );
}
export default App;
