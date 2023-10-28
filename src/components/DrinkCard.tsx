import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Drink} from '../pages/DrinkList';
import {FavoritesContext} from '../contexts/FavoritesContext';
import * as ColorScheme from '../styles/ColorScheme';

const DrinkCard = ({navigation, drink}: {navigation: any; drink: Drink}) => {
  const {strDrink, strDrinkThumb, idDrink} = drink;
  const {addFavDrink, removeFavDrink, isFavDrink} =
    useContext(FavoritesContext);

  const goToDrinkDetail = () => {
    navigation.push('DrinkDetails', {idDrink});
  };
  const toggleFavorite = () => {
    isFavDrink(drink) ? removeFavDrink(drink) : addFavDrink(drink);
  };
  return (
    <TouchableOpacity onPress={goToDrinkDetail}>
      <View style={styles.cardContainer}>
        <Text
          onPress={toggleFavorite}
          style={{
            ...styles.star,
            backgroundColor: isFavDrink(drink)
              ? ColorScheme.backgroundColor
              : ColorScheme.textColor,
          }}>
          <Text>{isFavDrink(drink) ? '❤️' : '🤍'}</Text>
        </Text>
        <Image source={{uri: strDrinkThumb}} style={styles.cardImage} />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text numberOfLines={2} style={styles.title}>
            {strDrink}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrinkCard;

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
