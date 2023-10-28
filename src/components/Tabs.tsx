import React, {useContext, useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../pages/Home';
import {BevarageStack, FavoritesStack, FoodStack} from './Stacks';
import * as ColorScheme from '../styles/ColorScheme';
import {StyleSheet, Text} from 'react-native';
import {FavoritesContext} from '../contexts/FavoritesContext';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const {favCount} = useContext(FavoritesContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="black"
      barStyle={{
        backgroundColor: ColorScheme.lightPrimary,
        borderTopColor: ColorScheme.primaryColor,
        borderTopWidth: 3,
        height: 75,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text style={styles.icon}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Food"
        component={FoodStack}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: () => <Text style={styles.icon}>🍗</Text>,
        }}
      />
      <Tab.Screen
        name="Beverage"
        component={BevarageStack}
        options={{
          tabBarLabel: 'Beverage',
          tabBarIcon: () => <Text style={styles.icon}>🍺</Text>,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Favorite',
          tabBarBadge: favCount,
          tabBarIcon: () => <Text style={styles.icon}>❤️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});

export default Tabs;
