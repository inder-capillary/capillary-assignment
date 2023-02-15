import * as types from './constants';

export const loadIssueDetails = issueNumber => ({
  type: types.LOAD_ISSUE_DETAILS,
  issueNumber,
});
