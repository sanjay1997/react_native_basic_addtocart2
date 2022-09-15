import axios from "axios";
import { GET_MOVIES,ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM } from "../constants";
const BASE_URL = 'https://fakestoreapi.com/products';

export const getMovies = () => {
    try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL}`);
        if (res.data) {
          dispatch({
            type: GET_MOVIES,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
};

export const addFavorite = movie => dispatch =>{
    dispatch({
        type: ADD_FAVORITE_ITEM,
        payload: movie,
      });
};

export const removeFavorite = movie => dispatch => {
    dispatch({
      type: REMOVE_FAVORITE_ITEM,
      payload: movie,
    });
  };