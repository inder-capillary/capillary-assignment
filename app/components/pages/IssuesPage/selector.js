import { createSelector } from 'reselect';

const selectIssues = state => state.get('issues');

const getIssuesList = () =>
  createSelector(selectIssues, issuesList => issuesList);

export { getIssuesList };
