/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_TRENDING_GIFS_SUCCESS,
  FETCH_NEXT_TRENDING_GIFS_SUCCESS,
} from './constants';

export const initialState = fromJS({
  gifs: {},
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_TRENDING_GIFS_SUCCESS:
      const gifs = {
        data: action.payload.data,
        currentPage: 1,
        totalPage: action.payload.pagination.total_count,
      };
      return state.set('gifs', gifs);

    case FETCH_NEXT_TRENDING_GIFS_SUCCESS:
      const nextGifs = {
        data: [...state.get('gifs').data, ...action.payload.data],
        totalPage: action.payload.pagination.total_count,
        currentPage: action.payload.pagination.offset,
      };
      return state.set('gifs', nextGifs);

    default:
      return state;
  }
}

export default homePageReducer;
