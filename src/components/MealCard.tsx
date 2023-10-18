import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Meal} from '../pages/MealList';

function MealCard({navigation, meal}: {navigation: any; meal: Meal}) {
  const {strMeal, strMealThumb, idMeal} = meal;

  const goToMealDetail = () => {
    navigation.push('Details', {idMeal});
  };

  return (
    <TouchableOpacity onPress={goToMealDetail}>
      <View style={styles.cardContainer}>
        <Image source={{uri: strMealThumb}} style={styles.cardImage} />
        <View>
          <Text numberOfLines={3} style={styles.categoryDescription}>
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
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  categoryDescription: {
    fontSize: 18,
    margin: 10,
  },

  categoryName: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default MealCard;
