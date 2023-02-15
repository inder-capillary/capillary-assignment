import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CapCard from '@capillarytech/cap-ui-library/CapCard';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';

import { getIssuesList } from '../IssuesPage/selector';

const IssueDetails = ({ issuesDetails }) => {
  const { issueId } = useParams();
  const [issueData, setIssueData] = useState(null);

  const getIssueDetails = () => {
    const issueDetails = issuesDetails
      ? issuesDetails.find(data => data.number === Number(issueId))
      : null;
    setIssueData(issueDetails);
  };

  useEffect(
    () => {
      getIssueDetails();
    },
    [issuesDetails, issueId],
  );

  useEffect(
    () => {
      actions.loadIssueDetails(issueId);
    },
    [issueId],
  );

  if (issueData) {
    const { title, body } = issueData;

    return (
      <div>
        <CapCard title={title}>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </CapCard>
      </div>
    );
  }

  return <div>No Issue Details Found</div>;
};

const mapStateToProps = createStructuredSelector({
  issuesDetails: getIssuesList(),
});
const withSaga = injectSaga({ key: 'issuesDetails', saga });
const withReducer = injectReducer({ key: 'issuesDetails', reducer });

IssueDetails.defaultProps = {
  issuesDetails: [],
};

IssueDetails.propTypes = {
  issuesDetails: PropTypes.array,
};

const withConnect = connect(mapStateToProps);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(IssueDetails);
