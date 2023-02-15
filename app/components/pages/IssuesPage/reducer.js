import * as types from './constants';

const initialState = [];

export const issuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ISSUES:
      return [...action.payload];
    default:
      return state;
  }
};

export default issuesReducer;
