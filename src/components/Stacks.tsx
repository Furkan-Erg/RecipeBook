import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Food from '../pages/Food';
import Bevarage from '../pages/Bevarage';
import Details from '../pages/Details';
import DrinkDetails from '../pages/DrinkDetails';
import DrinkList from '../pages/DrinkList';
import MealList from '../pages/MealList';
import Favorites from '../pages/Favorites';
const Stack = createNativeStackNavigator();

export const FoodStack = () => {
  return (
    <Stack.Navigator initialRouteName="Foods">
      <Stack.Screen name="Foods" component={Food} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="MealList" component={MealList} />
    </Stack.Navigator>
  );
};
export const BevarageStack = () => {
  return (
    <Stack.Navigator initialRouteName="Bevarages">
      <Stack.Screen name="Bevarages" component={Bevarage} />
      <Stack.Screen name="DrinkDetails" component={DrinkDetails} />
      <Stack.Screen name="DrinkList" component={DrinkList} />
    </Stack.Navigator>
  );
};
export const FavoritesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="DrinkDetails" component={DrinkDetails} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
