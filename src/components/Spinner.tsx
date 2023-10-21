import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import * as ColorScheme from '../styles/ColorScheme';
const Spinner = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={100} color={ColorScheme.primaryColor} />
    </View>
  );
};

export default Spinner;
