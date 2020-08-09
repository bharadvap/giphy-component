// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { FETCH_TRENDING_GIFS, FETCH_NEXT_TRENDING_GIFS } from './constants';
import request from '../../utils/request';
function fetchData(params) {
  return request(params)
    .then(response => {
      return response;
    })
    .catch(err => {});
}

export function* fetchTrendingGifs({ search, page }) {
  try {
    let response;
    if (search) {
      response = yield call(
        fetchData,
        '/search?api_key=8516ae5930e2408f8dd8849ccb63835d&q=' + search,
      );
    } else {
      response = yield call(
        fetchData,
        '/trending?api_key=8516ae5930e2408f8dd8849ccb63835d',
      );
    }

    if (response) {
      yield put(actions.fetchTrendingGifsSuccess(response));
    }
  } catch (e) {
    console.log('ERROR', e);
  }
}

export function* fetchNextTrendingGifs({ search, page }) {
  try {
    let response;
    if (search) {
      response = yield call(
        fetchData,
        '/search?api_key=8516ae5930e2408f8dd8849ccb63835d&q=' +
          search +
          '&offset=' +
          page,
      );
    } else {
      response = yield call(
        fetchData,
        '/trending?api_key=8516ae5930e2408f8dd8849ccb63835d' +
          '&offset=' +
          page,
      );
    }
    // const response = additionalPlacesData;
    if (response) {
      yield put(actions.fetchNextTrendingGifsSuccess(response));
    }
  } catch (e) {
    console.log('ERROR', e);
  }
}

export default function* saga() {
  yield takeEvery(FETCH_TRENDING_GIFS, fetchTrendingGifs);
  yield takeEvery(FETCH_NEXT_TRENDING_GIFS, fetchNextTrendingGifs);
}
