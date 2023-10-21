import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import Card from '../components/Card';
import MealCard from '../components/MealCard';
import {Meal} from './MealList';
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
  const [isRandomMeal, setIsRandomMeal] = React.useState(false);

  const getRandomMeals = async () => {
    const tempRandomMeals: Meal[] = [];
    for (let i = 0; i < 4; i++) {
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
    setIsRandomMeal(true);
  };

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.row}>
          {isRandomMeal ? (
            randomMeals?.map((meal: Meal) => (
              <View key={meal.idMeal}>
                <MealCard navigation={navigation} meal={meal}></MealCard>
              </View>
            ))
          ) : (
            <Text>Random Meal</Text>
          )}
        </View>
        <Button onPress={getRandomMeals} title="Suggest Random Food"></Button>

        <Text style={{color: '#333'}}>
          {isDetailed ? 'Show Icons' : 'Show Detailed'}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDetailed ? '#22aaaf' : '#f4f3f4'}
          value={isDetailed}
          onValueChange={toggleDetailed}
        />
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
});
