import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Drink} from '../pages/DrinkList';
import Carousel from 'react-native-snap-carousel';
import DrinkCard from './DrinkCard';

const DrinkCaurosel = ({
  navigation,
  drinkList,
}: {
  navigation: any;
  drinkList: Drink[];
}) => {
  const data = drinkList;

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.carouselItem}>
        <DrinkCard navigation={navigation} drink={item}></DrinkCard>
      </View>
    );
  };

  return (
    <View style={{height: 250}}>
      <Carousel
        data={data}
        renderItem={_renderItem}
        sliderWidth={400}
        itemWidth={200}
      />
    </View>
  );
};

export default DrinkCaurosel;

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scale: 1.3}],
    paddingTop: 25,
  },
});
