import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../pages/Home';
import {BevarageStack, FavoritesStack, FoodStack} from './Stacks';
import * as ColorScheme from '../styles/ColorScheme';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="black"
      barStyle={{backgroundColor: ColorScheme.lightPrimary}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Food" component={FoodStack} />
      <Tab.Screen name="Beverage" component={BevarageStack} />
      <Tab.Screen name="Favorite" component={FavoritesStack} />
    </Tab.Navigator>
  );
}

export default Tabs;
