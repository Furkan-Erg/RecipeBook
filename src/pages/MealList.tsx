import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import MealCard from '../components/MealCard';

export interface MealList {
  meals: Meal[];
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

function MealList({navigation, route}: {navigation: any; route: any}) {
  const {strCategory} = route.params;

  const [meals, setMeals] = React.useState<Meal[]>([]);
  const getMealList = useCallback(async () => {
    await axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        const tempMealList = res.data.meals.map((meal: Meal) => {
          return meal;
        });
        setMeals(tempMealList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getMealList();
  }, [getMealList]);

  return (
    <View>
      <Text>MealList</Text>

      <FlatList
        style={{backgroundColor: '#f0f0f0', padding: 10}}
        data={meals}
        renderItem={({item}) => (
          <MealCard meal={item} navigation={navigation} />
        )}
        keyExtractor={item => item.idMeal}></FlatList>
    </View>
  );
}

export default MealList;

const styles = StyleSheet.create({});
