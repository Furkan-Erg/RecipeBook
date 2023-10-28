import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {FavoritesContext} from '../contexts/FavoritesContext';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import {Meal} from './MealList';
import {Drink} from './DrinkList';

const Favorites = ({navigation}: {navigation: any}) => {
  const {favMeals, favDrinks} = useContext(FavoritesContext);

  return (
    <ScrollView>
      <View style={styles.column}>
        <View style={styles.row}>
          {favMeals?.map((meal: Meal) => (
            <MealCard key={meal.idMeal} meal={meal} navigation={navigation} />
          ))}
          <View style={styles.row}>
            {favDrinks?.map((drink: Drink) => (
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorites;
