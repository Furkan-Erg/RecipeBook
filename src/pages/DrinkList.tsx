import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';

export interface DrinkList {
  drinks: Drink[];
}

export interface Drink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}
const DrinkList = ({navigation, route}: {navigation: any; route: any}) => {
  const {strCategory} = route.params;
  const [drinks, setDrinks] = useState<Drink[]>();
  const getDrinkList = useCallback(async () => {
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        const tempDrinkList = res.data.drinks.map((drink: Drink) => {
          return drink;
        });
        setDrinks(tempDrinkList);
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    getDrinkList();
  }, [getDrinkList]);

  return !drinks ? (
    <Spinner />
  ) : (
    <ScrollView>
      <View style={styles.row}>
        {drinks.map((drink: Drink) => (
          <View key={drink.idDrink}>
            <DrinkCard navigation={navigation} drink={drink}></DrinkCard>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default DrinkList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
