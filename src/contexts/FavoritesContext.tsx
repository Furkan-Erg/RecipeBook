import React, {createContext, useEffect, useState} from 'react';
import {Meal} from '../pages/MealList';
import {Drink} from '../pages/DrinkList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'lodash';
export const FavoritesContext = createContext<any>({});

const FavoritesContextProvider = ({children}: {children: any}) => {
  const [favMeals, setFavMeals] = useState<Meal[]>([]);
  const [favDrinks, setFavDrinks] = useState<Drink[]>([]);

  const setFavMealsToStorage = async (meals: Meal[]) => {
    const jsonValue = JSON.stringify(meals);
    await AsyncStorage.setItem('@fav_meals', jsonValue);
  };
  const setFavDrinksToStorage = async (drinks: Drink[]) => {
    const jsonValue = JSON.stringify(drinks);
    await AsyncStorage.setItem('@fav_drinks', jsonValue);
  };

  const getFavMealsFromStorage = async () => {
    const jsonValue = await AsyncStorage.getItem('@fav_meals');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  const getFavDrinksFromStorage = async () => {
    const jsonValue = await AsyncStorage.getItem('@fav_drinks');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getFavDrinksFromStorage().then(drinks => {
      setFavDrinks(drinks);
    });
    getFavMealsFromStorage().then(meals => {
      setFavMeals(meals);
    });
  }, []);

  const addFavMeal = (meal: Meal) => {
    let newFavMeals;
    if (favMeals) {
      newFavMeals = [...favMeals, meal];
    } else {
      newFavMeals = [meal];
    }
    setFavMeals(newFavMeals);
    setFavMealsToStorage(newFavMeals);
  };

  const addFavDrink = (drink: Drink) => {
    let newFavDrinks;
    if (favDrinks) {
      newFavDrinks = [...favDrinks, drink];
    } else {
      newFavDrinks = [drink];
    }
    setFavDrinks(newFavDrinks);
    setFavDrinksToStorage(newFavDrinks);
  };

  const removeFavMeal = (meal: Meal) => {
    const newFavMeals = favMeals.filter(m => m.idMeal !== meal.idMeal);
    setFavMeals(newFavMeals);
    setFavMealsToStorage(newFavMeals);
  };
  const removeFavDrink = (drink: Drink) => {
    const newFavDrinks = favDrinks.filter(d => d.idDrink !== drink.idDrink);
    setFavDrinks(newFavDrinks);
    setFavDrinksToStorage(newFavDrinks);
  };

  const isFavMeal = (meal: Meal) => {
    return favMeals?.some(m => m.idMeal === meal.idMeal);
  };
  const isFavDrink = (drink: Drink) => {
    return favDrinks?.some(d => d.idDrink === drink.idDrink);
  };

  const value = {
    favMeals,
    favDrinks,
    addFavMeal,
    addFavDrink,
    removeFavMeal,
    removeFavDrink,
    isFavMeal,
    isFavDrink,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
