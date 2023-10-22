import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../components/Card';
import MealCard from '../components/MealCard';
import {Meal} from './MealList';
import * as ColorScheme from '../styles/ColorScheme';
import Spinner from '../components/Spinner';
import _, {set} from 'lodash';
import MealCarousel from '../components/MealCaurosel';
import {Divider, LinearProgress} from '@rneui/base';
export interface Categories {
  categories: Category[];
}
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
function Food({navigation}: any): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategories = useCallback(async () => {
    await axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const tempCategories = response.data.categories.map(
          (category: Category) => {
            return category;
          },
        );
        setCategories(tempCategories);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }, []);
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [isDetailed, setIsDetailed] = useState(false);
  const toggleDetailed = () => {
    setIsDetailed(!isDetailed);
  };
  const [randomMeals, setRandomMeals] = useState<Meal[]>();

  const getRandomMeals = useCallback(async () => {
    const tempRandomMeals: Meal[] = [];
    for (let i = 0; i < 2; i++) {
      await axios
        .get('https://www.themealdb.com/api/json/v1/1/random.php', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const tempRandomMeal = response.data.meals.map((meal: Meal) => {
            return meal;
          });
          tempRandomMeals.push(tempRandomMeal[0]);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    }
    setRandomMeals(tempRandomMeals);
  }, []);
  useEffect(() => {
    getRandomMeals();
  }, [getRandomMeals]);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);

  const searchFood = useCallback(async (text: string) => {
    if (text === '') {
      setSearchResults([]);
      return;
    }
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const searchResponse = response.data.meals.map((meal: Meal) => {
          return meal;
        });
        setSearchResults(searchResponse);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }, []);
  const debouncedAPICall = _.debounce(searchFood, 300);

  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (text: string) => {
    setSearchTerm(text);
    debouncedAPICall(text);
  };

  return !randomMeals ? (
    <Spinner />
  ) : (
    <ScrollView>
      <View style={styles.column}>
        <TextInput
          style={styles.search}
          placeholder="Search"
          onChangeText={handleInputChange}
          value={searchTerm}
          placeholderTextColor="white"
        />
        {searchResults.length > 0 ? (
          <MealCarousel
            mealList={searchResults}
            navigation={navigation}></MealCarousel>
        ) : null}
      </View>
      <LinearProgress
        color={ColorScheme.primaryColor}
        value={100}></LinearProgress>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.row}>
          {randomMeals?.map((meal: Meal) => (
            <View key={meal.idMeal}>
              <MealCard navigation={navigation} meal={meal}></MealCard>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={getRandomMeals}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
            Suggest Random Food
          </Text>
        </TouchableOpacity>

        <LinearProgress
          color={ColorScheme.primaryColor}
          value={100}></LinearProgress>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#333', fontSize: 20, margin: 15}}>
            {isDetailed ? 'Show Icons' : 'Show Detailed'}
          </Text>
          <Switch
            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
            trackColor={{
              false: ColorScheme.lightPrimary,
              true: ColorScheme.lightSecondary,
            }}
            thumbColor={
              isDetailed ? ColorScheme.secondaryColor : ColorScheme.primaryColor
            }
            value={isDetailed}
            onValueChange={toggleDetailed}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {categories.map((category: Category) => (
          <View key={category.idCategory}>
            <Card
              isDetailed={isDetailed}
              navigation={navigation}
              category={category}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
export default Food;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: ColorScheme.primaryColor,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  search: {
    height: 40,
    width: 225,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: ColorScheme.lightPrimary,
    borderColor: ColorScheme.primaryColor,
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
  },
});
