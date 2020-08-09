/*
 *
 * HomePage actions
 *
 */

import {
  FETCH_TRENDING_GIFS_SUCCESS,
  FETCH_NEXT_TRENDING_GIFS_SUCCESS,
  FETCH_TRENDING_GIFS,
  FETCH_NEXT_TRENDING_GIFS,
} from './constants';

export function fetchTrendingGifsSuccess(payload) {
  return {
    type: FETCH_TRENDING_GIFS_SUCCESS,
    payload: payload,
  };
}

export function fetchNextTrendingGifsSuccess(payload) {
  return {
    type: FETCH_NEXT_TRENDING_GIFS_SUCCESS,
    payload: payload,
  };
}

export function fetchTrendingGifs(search, page) {
  return {
    type: FETCH_TRENDING_GIFS,
    search,
    page,
  };
}

export function fetchNextTrendingGifs(search, page) {
  return {
    type: FETCH_NEXT_TRENDING_GIFS,
    search,
    page,
  };
}

export default {
  fetchTrendingGifsSuccess,
  fetchNextTrendingGifsSuccess,
  fetchTrendingGifs,
  fetchNextTrendingGifs,
};
