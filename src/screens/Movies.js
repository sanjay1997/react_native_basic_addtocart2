import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMovies, addFavorite, removeFavorite } from '../actions/movielist';


const Movies = () => {

  const {movies, favorites} = useSelector(state => state.listReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());

  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));

  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchMovies();
  }, [])

  console.log(movies)
    
  return (
    <View style={{flex:1,marginTop:5,paddingHorizontal:15}}>
      <Text style={{fontSize: 22}}>Popular Movies</Text>


        <View style={{flex: 1, marginTop: 5}}>
            <FlatList 
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
                   return(
                      <View style={{marginVertical: 12}}>
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          resizeMode="cover"
                          style={{width: 100, height: 150, borderRadius: 10}}
                        />
                        <View style={{flex: 1, marginLeft: 12}}>
                          <View>
                            <Text style={{fontSize: 22, paddingRight: 16}}>
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 10,
                              alignItems: 'center',
                            }}>
                            <MaterialIcons color="green" name="thumb-up" size={32} />
                            <Text
                              style={{
                                fontSize: 18,
                                paddingLeft: 10,
                                color: '#64676D',
                              }}>
                              {item.vote_count}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                exists(item) ? handleRemoveFavorite(item) : handleAddFavorite(item)
                              }
                              activeOpacity={0.7}
                              style={{
                                marginLeft: 14,
                                flexDirection: 'row',
                                padding: 2,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                              }}>
                              <MaterialIcons
                                color="orange"
                                size={32}
                                name={exists(item) ? 'favorite' : 'favorite-outline'}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
              );
            }}
            />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Movies;