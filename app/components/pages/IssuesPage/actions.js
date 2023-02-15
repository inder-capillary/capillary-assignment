import * as types from './constants';

export const addIssues = issuesList => ({
  type: types.ADD_ISSUES,
  payload: issuesList,
});

export const loadIssues = () => ({
  type: types.LOAD_ISSUES,
});
