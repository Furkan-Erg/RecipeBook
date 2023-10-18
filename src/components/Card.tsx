import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Category} from '../pages/Home';

function Card({category}: {category: Category}, {navigation}: any) {
  const {idCategory, strCategory, strCategoryDescription, strCategoryThumb} =
    category;

  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: strCategoryThumb}} style={styles.cardImage} />
      <View>
        <Text style={styles.categoryName}>{strCategory}</Text>
        <Text numberOfLines={3} style={styles.categoryDescription}>
          {strCategoryDescription}
        </Text>
      </View>
    </View>
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

export default Card;
