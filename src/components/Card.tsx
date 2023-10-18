import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Category} from '../pages/Home';

function Card({navigation, category}: {navigation: any; category: Category}) {
  const {idCategory, strCategory, strCategoryDescription, strCategoryThumb} =
    category;

  const goToMealList = () => {
    navigation.push('MealList', {strCategory});
  };

  return (
    <TouchableOpacity onPress={goToMealList}>
      <View style={styles.cardContainer}>
        <Image source={{uri: strCategoryThumb}} style={styles.cardImage} />
        <View style={{padding: 10}}>
          <Text style={styles.title}>{strCategory}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {strCategoryDescription}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#333',
  },
});

export default Card;
