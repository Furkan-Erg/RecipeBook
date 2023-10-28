import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Meal} from '../pages/MealList';
import * as ColorScheme from '../styles/ColorScheme';
import {FavoritesContext} from '../contexts/FavoritesContext';

function MealCard({navigation, meal}: {navigation: any; meal: Meal}) {
  const {strMeal, strMealThumb, idMeal} = meal;
  const {addFavMeal, removeFavMeal, isFavMeal} = useContext(FavoritesContext);
  const goToMealDetail = () => {
    navigation.push('Details', {idMeal});
  };
  const toggleFavorite = () => {
    isFavMeal(meal) ? removeFavMeal(meal) : addFavMeal(meal);
  };

  return (
    <TouchableOpacity onPress={goToMealDetail}>
      <View style={styles.cardContainer}>
        <Text
          onPress={toggleFavorite}
          style={{
            ...styles.star,
            backgroundColor: isFavMeal(meal)
              ? ColorScheme.backgroundColor
              : ColorScheme.textColor,
          }}>
          <Text>{isFavMeal(meal) ? '❤️' : '🤍'}</Text>
        </Text>

        <Image source={{uri: strMealThumb}} style={styles.cardImage} />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text numberOfLines={2} style={styles.title}>
            {strMeal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    height: 180,
  },
  cardImage: {
    width: 150,
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 10,
  },
  star: {
    position: 'absolute',
    right: 0,
    borderRadius: 50,
    width: 40,
    fontSize: 20,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    color: 'white',
    zIndex: 2,
    elevation: 4,
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default MealCard;
