import {FlatList} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import Card from '../components/Card';
export interface Categories {
  categories: Category[];
}
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
function Home(): JSX.Element {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const getCategories = useCallback(async () => {
    await axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const tempCategories = response.data.categories.map(
          (category: Category) => {
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

  return (
    <FlatList
      persistentScrollbar={true}
      style={{backgroundColor: '#f0f0f0', padding: 10}}
      data={categories}
      renderItem={({item}) => <Card category={item} />}
      keyExtractor={item => item.idCategory}></FlatList>
  );
}

export default Home;
