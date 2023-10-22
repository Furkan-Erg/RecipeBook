import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import * as ColorScheme from '../styles/ColorScheme';

export interface DrinkResponse {
  drinks: DrinkCategory[];
}

export interface DrinkCategory {
  strCategory: string;
}

const Drink = ({navigation, route}: any) => {
  const [categories, setCategories] = useState<DrinkCategory[]>([]);
  const getCategories = useCallback(async () => {
    await axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const tempCategories = response.data.drinks.map(
          (category: DrinkCategory) => {
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
  const goToDrinkList = (strCategory: string) => {
    navigation.push('DrinkList', {strCategory: strCategory});
  };

  return (
    <ScrollView>
      <View style={styles.row}>
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={goToDrinkList.bind(this, category.strCategory)}
            style={styles.cardContainer}
            key={index}>
            <Text style={styles.text}>{category.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Drink;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 10,
    marginBottom: 20,
    width: 150,
    height: 100,
  },
  text: {
    fontSize: 15,
    color: ColorScheme.textColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
});
