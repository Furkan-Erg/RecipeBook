import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import * as ColorScheme from '../styles/ColorScheme';
import {Image} from '@rneui/themed/dist/Image';
import Spinner from '../components/Spinner';
import {LinearProgress} from '@rneui/base';
import DrinkCard from '../components/DrinkCard';
import _ from 'lodash';
import {Drink} from './DrinkList';
import DrinkCaurosel from '../components/DrinkCaurosel';

export interface DrinkResponse {
  drinks: DrinkCategory[];
}

export interface DrinkCategory {
  strCategory: string;
}

const Bevarage = ({navigation, route}: any) => {
  const [categories, setCategories] = useState<DrinkCategory[]>([]);
  const getCategories = useCallback(async () => {
    await axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const tempCategories = response.data.drinks.map(
          (category: DrinkCategory) => {
            return category;
          },
        );
        setCategories(tempCategories);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }, []);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const goToDrinkList = (strCategory: string) => {
    navigation.push('DrinkList', {strCategory: strCategory});
  };
  const images = [
    {
      categoryName: 'Ordinary Drink',
      image:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
    },
    {
      categoryName: 'Cocktail',
      image:
        'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    },
    {
      categoryName: 'Milk / Float / Shake',
      image:
        'https://www.thecocktaildb.com/images/media/drink/vqquwx1472720634.jpg',
    },
    {
      categoryName: 'Other/Unknown',
      image:
        'https://www.thecocktaildb.com/images/media/drink/uyrvut1479473214.jpg',
    },
    {
      categoryName: 'Cocoa',
      image:
        'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
    },
    {
      categoryName: 'Shot',
      image:
        'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    },
    {
      categoryName: 'Coffee / Tea',
      image:
        'https://www.thecocktaildb.com/images/media/drink/sywsqw1439906999.jpg',
    },
    {
      categoryName: 'Homemade Liqueur',
      image:
        'https://www.thecocktaildb.com/images/media/drink/swqxuv1472719649.jpg',
    },
    {
      categoryName: 'Punch / Party Drink',
      image:
        'https://www.thecocktaildb.com/images/media/drink/3s36ql1504366260.jpg',
    },
    {
      categoryName: 'Beer',
      image:
        'https://www.thecocktaildb.com/images/media/drink/uyrvut1479473214.jpg',
    },
    {
      categoryName: 'Soft Drink / Soda',
      image:
        'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    },
  ];
  const [randomDrinks, setRandomDrinks] = useState<Drink[]>();

  const getRandomDrinks = useCallback(async () => {
    const tempRandomDrinks: Drink[] = [];
    for (let i = 0; i < 2; i++) {
      await axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/random.php', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const tempRandomDrink = response.data.drinks.map((drink: Drink) => {
            return drink;
          });
          tempRandomDrinks.push(tempRandomDrink[0]);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    }
    setRandomDrinks(tempRandomDrinks);
  }, []);
  useEffect(() => {
    getRandomDrinks();
  }, [getRandomDrinks]);
  const [searchResults, setSearchResults] = useState<Drink[]>([]);

  const searchDrink = useCallback(async (text: string) => {
    if (text === '') {
      setSearchResults([]);
      return;
    }
    await axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const searchResponse = response.data.drinks.map((drink: Drink) => {
          return drink;
        });
        setSearchResults(searchResponse);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }, []);
  const debouncedAPICall = _.debounce(searchDrink, 300);

  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (text: string) => {
    setSearchTerm(text);
    debouncedAPICall(text);
  };
  const categoryIcons = [
    {name: 'Ordinary Drink', icon: '🧉'},
    {name: 'Cocktail', icon: '🍹'},
    {name: 'Milk / Float / Shake', icon: '🥛'},
    {name: 'Other/Unknown', icon: '❓'},
    {name: 'Cocoa', icon: '🍫'},
    {name: 'Shot', icon: '🥃'},
    {name: 'Coffee / Tea', icon: '☕'},
    {name: 'Homemade Liqueur', icon: '🍸'},
    {name: 'Punch / Party Drink', icon: '🍾'},
    {name: 'Beer', icon: '🍺'},
    {name: 'Soft Drink / Soda', icon: '🥤'},
  ];
  const [isDetailed, setIsDetailed] = useState(false);
  const toggleDetailed = () => {
    setIsDetailed(!isDetailed);
  };
  return !randomDrinks ? (
    <Spinner />
  ) :(
    <ScrollView>
      <View style={styles.column}>
        <TextInput
          style={styles.search}
          placeholder="Search"
          onChangeText={handleInputChange}
          value={searchTerm}
          placeholderTextColor="white"
        />
        {searchResults.length > 0 ? (
          <DrinkCaurosel
            drinkList={searchResults}
            navigation={navigation}></DrinkCaurosel>
        ) : null}
      </View>
      <LinearProgress color={ColorScheme.primaryColor} value={100} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.row}>
          {randomDrinks?.map((drink: Drink) => (
            <View key={drink.idDrink}>
              <DrinkCard navigation={navigation} drink={drink}></DrinkCard>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={getRandomDrinks}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
            Suggest Random Drink
          </Text>
        </TouchableOpacity>
      </View>

      <LinearProgress
        color={ColorScheme.primaryColor}
        value={100}></LinearProgress>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <Text style={{color: '#333', fontSize: 20, margin: 15}}>
          {isDetailed ? 'Show Icons' : 'Show Detailed'}
        </Text>
        <Switch
          style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
          trackColor={{
            false: ColorScheme.lightPrimary,
            true: ColorScheme.lightSecondary,
          }}
          thumbColor={
            isDetailed ? ColorScheme.secondaryColor : ColorScheme.primaryColor
          }
          value={isDetailed}
          onValueChange={toggleDetailed}
        />
      </View>
      <View style={styles.row}>
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={goToDrinkList.bind(this, category.strCategory)}
            key={index}>
            {isDetailed ? (
              <View style={styles.cardContainer}>
                <Image
                  source={{uri: images[index].image}}
                  style={styles.cardImage}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text style={styles.title}>{category.strCategory}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.icon}>
                <Text style={{fontSize: 50, color: '#333'}}>
                  {categoryIcons[index].icon}
                </Text>
                <Text style={styles.title}>{category.strCategory}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Bevarage;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
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
  button: {
    alignItems: 'center',
    backgroundColor: ColorScheme.primaryColor,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    height: 40,
    width: 225,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: ColorScheme.lightPrimary,
    borderColor: ColorScheme.primaryColor,
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
  },
  icon: {
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 5,
    width: 110,
    height: 110,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
