import Axios from 'axios';
import { all, call, takeEvery } from 'redux-saga/effects';
import * as types from './constants';

const fetchIssues = async issueNumber => {
  const res = await Axios.get(
    `https://api.github.com/repos/ant-design/ant-design/issues/${issueNumber}`,
  );
  return res;
};

export function* loadIssuesData(issueNumber) {
  try {
    const response = yield call(fetchIssues, issueNumber);
    return response;
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

export function* watchForLoadIssues() {
  yield takeEvery(types.LOAD_ISSUE_DETAILS, loadIssuesData);
}

export default function* root() {
  yield all([watchForLoadIssues()]);
}
