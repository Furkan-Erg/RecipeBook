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
    width: 175,
    height: 180,
  },
  cardImage: {
    width: 175,
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
});

export default MealCard;
