import { put } from 'redux-saga/effects';

export function* handleError(error, action) {
  yield put(
    action(
      (error.body && (error.body.message || error.body.errors)) ||
        error.message,
    ),
  );
}
