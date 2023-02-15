import { createSelector } from 'reselect';

const selectIssues = state => state.get('issuesDetails');

const getIssuesList = () =>
  createSelector(selectIssues, issuesList => issuesList);

export { getIssuesList };
