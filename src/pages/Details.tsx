import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import axios from 'axios';

export interface Details {
  meals: Meal[];
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: any;
  strIngredient17: any;
  strIngredient18: any;
  strIngredient19: any;
  strIngredient20: any;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: any;
  strMeasure17: any;
  strMeasure18: any;
  strMeasure19: any;
  strMeasure20: any;
  strSource: any;
  strImageSource: any;
  strCreativeCommonsConfirmed: any;
  dateModified: any;
}

const Details = ({route}: {route: any}) => {
  const {idMeal} = route.params;
  const [details, setDetails] = React.useState<Meal[]>([]);

  const getDetails = useCallback(async () => {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then(res => {
        const tempDetails = res.data.meals.map((detail: Details) => {
          return detail;
        });
        setDetails(tempDetails);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <ScrollView style={styles.container}>
      {details.map((detail: any) => (
        <View key={detail.idMeal}>
          <Image source={{uri: detail.strMealThumb}} style={styles.img} />
          <Text style={styles.title}> {detail.strMeal}</Text>
          <Text style={styles.instructions}>
            Instructions: {detail.strInstructions}
          </Text>
          <Text style={styles.description}>Country: {detail.strArea}</Text>
          {Array.from({length: 20}).map((_, index) => {
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

const Ingredient = ({
  strIngredient,
  strMeasure,
}: {
  strIngredient: string;
  strMeasure: string;
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>{strIngredient}</Text>
      <Text style={styles.description}>{strMeasure}</Text>
    </View>
  );
};

export {Ingredient};
export default Details;

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
