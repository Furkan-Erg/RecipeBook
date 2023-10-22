import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Drink} from '../pages/DrinkList';

const DrinkCard = ({navigation, drink}: {navigation: any; drink: Drink}) => {
  const {strDrink, strDrinkThumb, idDrink} = drink;
  const goToDrinkDetail = () => {
    navigation.push('DrinkDetails', {idDrink});
  };

  return (
    <TouchableOpacity onPress={goToDrinkDetail}>
      <View style={styles.cardContainer}>
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
});
