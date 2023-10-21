import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import Card from '../components/Card';
import MealCard from '../components/MealCard';
import {Meal} from './MealList';
import * as ColorScheme from '../styles/ColorScheme';
import Spinner from '../components/Spinner';
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
  const [categories, setCategories] = React.useState<Category[]>([]);
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

  const [isDetailed, setIsDetailed] = React.useState(false);
  const toggleDetailed = () => {
    setIsDetailed(!isDetailed);
  };
  const [randomMeals, setRandomMeals] = React.useState<Meal[]>();

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

  return !randomMeals ? (
    <Spinner />
  ) : (
    <ScrollView>
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
});
