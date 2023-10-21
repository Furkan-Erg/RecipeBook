import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = ({navigation}: {navigation: any}) => {
  const goToFoods = () => {
    navigation.push('Foods');
  };
  const goToDrinks = () => {
    navigation.push('Beverages');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Food" onPress={goToFoods} />
      <Button title="Go to Beverages" onPress={goToDrinks} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
