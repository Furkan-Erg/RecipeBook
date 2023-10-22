import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Drink} from './DrinkList';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Ingredient} from './Details';

export interface Root {
  drinks: DrinkDetail[];
}

export interface DrinkDetail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: any;
  strTags: string;
  strVideo: any;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: any;
  strInstructionsDE: string;
  strInstructionsFR: any;
  strInstructionsIT: string;
  'strInstructionsZH-HANS': any;
  'strInstructionsZH-HANT': any;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: any;
  strIngredient6: any;
  strIngredient7: any;
  strIngredient8: any;
  strIngredient9: any;
  strIngredient10: any;
  strIngredient11: any;
  strIngredient12: any;
  strIngredient13: any;
  strIngredient14: any;
  strIngredient15: any;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: any;
  strMeasure5: any;
  strMeasure6: any;
  strMeasure7: any;
  strMeasure8: any;
  strMeasure9: any;
  strMeasure10: any;
  strMeasure11: any;
  strMeasure12: any;
  strMeasure13: any;
  strMeasure14: any;
  strMeasure15: any;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

const DrinkDetails = ({route}: {route: any}) => {
  const {idDrink} = route.params;
  const [drinkDetails, setDrinkDetails] = useState<DrinkDetail[]>();
  const getDrinkDetails = useCallback(async () => {
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        const tempDrinkDetails = res.data.drinks.map((drink: Drink) => {
          return drink;
        });
        setDrinkDetails(tempDrinkDetails);
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    getDrinkDetails();
  }, [getDrinkDetails]);

  return !drinkDetails ? (
    <Spinner />
  ) : (
    <ScrollView style={styles.container}>
      {drinkDetails.map((detail: any) => (
        <View key={detail.idDrink}>
          <Image source={{uri: detail.strDrinkThumb}} style={styles.img} />
          <Text style={styles.title}> {detail.strDrink}</Text>
          {detail.strInstructions ? (
            <Text style={styles.instructions}>
              Instructions: {detail.strInstructions}
            </Text>
          ) : null}

          {Array.from({length: 15}).map((_, index) => {
            const ingredient = detail[`strIngredient${index + 1}`];
            const measure = detail[`strMeasure${index + 1}`];
            if (ingredient && measure && ingredient !== '' && measure !== '') {
              return (
                <View key={index}>
                  <Ingredient
                    strIngredient={ingredient}
                    strMeasure={measure}></Ingredient>
                </View>
              );
            }
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default DrinkDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
  },
  instructions: {
    fontSize: 15,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#333',
  },
  img: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});
