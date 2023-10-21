import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Food from './src/pages/Food';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './src/pages/Details';
import MealList from './src/pages/MealList';
import Home from './src/pages/Home';
import Drink from './src/pages/Drink';
import * as ColorScheme from './src/styles/ColorScheme';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: ColorScheme.primaryColor,
  };
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Foods" component={Food} />
        <Stack.Screen name="Beverages" component={Drink} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="MealList" component={MealList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
