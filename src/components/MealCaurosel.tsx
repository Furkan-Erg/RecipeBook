import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MealCard from './MealCard';
import {Meal} from '../pages/MealList';

const MealCarousel = ({
  navigation,
  mealList,
}: {
  navigation: any;
  mealList: Meal[];
}) => {
  const data = mealList;

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.carouselItem}>
        <MealCard navigation={navigation} meal={item}></MealCard>
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

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scale: 1.3}],
    paddingTop: 25,
  },
});

export default MealCarousel;
