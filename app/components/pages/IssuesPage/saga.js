import Axios from 'axios';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import { addIssues } from './actions';
import * as types from './constants';

const fetchIssues = async () => {
  const res = await Axios.get(
    'https://api.github.com/repos/ant-design/ant-design/issues',
  );
  return res;
};

export function* loadIssuesData() {
  try {
    const response = yield call(fetchIssues);
    yield put(addIssues([...response.data]));
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

export function* watchForLoadIssues() {
  yield takeLatest(types.LOAD_ISSUES, loadIssuesData);
}

export default function*() {
  yield all([watchForLoadIssues()]);
}
