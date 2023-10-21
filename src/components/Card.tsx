import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Category} from '../pages/Food';

function Card({
  isDetailed,
  navigation,
  category,
}: {
  isDetailed: boolean;
  navigation: any;
  category: Category;
}) {
  const {strCategory, strCategoryDescription, strCategoryThumb} = category;

  const goToMealList = () => {
    navigation.push('MealList', {strCategory});
  };
  const categoryIcons = [
    {name: 'Beef', icon: '🥩'},
    {name: 'Chicken', icon: '🍗'},
    {name: 'Dessert', icon: '🍰'},
    {name: 'Lamb', icon: '🐑'},
    {name: 'Miscellaneous', icon: '🍱'},
    {name: 'Pasta', icon: '🍝'},
    {name: 'Pork', icon: '🐷'},
    {name: 'Seafood', icon: '🍤'},
    {name: 'Side', icon: '🍟'},
    {name: 'Starter', icon: '🍽️'},
    {name: 'Vegan', icon: '🥑'},
    {name: 'Vegetarian', icon: '🥗'},
    {name: 'Breakfast', icon: '🍳'},
    {name: 'Goat', icon: '🐐'},
  ];
  const categoryIcon = categoryIcons.find(
    categoryIcon => categoryIcon.name === strCategory,
  );

  return (
    <TouchableOpacity onPress={goToMealList}>
      {isDetailed ? (
        <View style={styles.cardContainer}>
          <Image source={{uri: strCategoryThumb}} style={styles.cardImage} />
          <View style={{padding: 10}}>
            <Text style={styles.title}>{strCategory}</Text>
            <Text numberOfLines={3} style={styles.description}>
              {strCategoryDescription}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.icon}>
            <Text style={{fontSize: 50, color: '#333'}}>
              {categoryIcon?.icon}
            </Text>
            <Text style={styles.title}>{strCategory}</Text>
          </View>
        </View>
      )}
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#333',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 10,
    width: 100,
  },
});

export default Card;
