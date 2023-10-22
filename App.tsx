import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Food from './src/pages/Food';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './src/pages/Details';
import MealList from './src/pages/MealList';
import Home from './src/pages/Home';
import Bevarage from './src/pages/Bevarage';
import * as ColorScheme from './src/styles/ColorScheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrinkList from './src/pages/DrinkList';
import DrinkDetails from './src/pages/DrinkDetails';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: ColorScheme.secondaryColor,
  };
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Foods" component={Food} />
          <Stack.Screen name="Beverages" component={Bevarage} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="DrinkDetails" component={DrinkDetails} />
          <Stack.Screen name="MealList" component={MealList} />
          <Stack.Screen name="DrinkList" component={DrinkList} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
