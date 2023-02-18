import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CapTable from '@capillarytech/cap-ui-library/CapTable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { CapButton, CapTag } from '@capillarytech/cap-ui-library';
import useQuery from '../../../lib/CustomHooks/useQuery';
import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';
import { getIssuesList } from './selector';
import { publicPath } from '../../../config/path';

const IssuesPage = ({ actions, issues }) => {
  const [issuesList, setIssuesList] = useState([]);
  const history = useHistory();
  const queryParams = useQuery();
  const currentPage = Number(queryParams.get('currentPage'));

  const columns = [
    {
      title: 'Issue Number',
      dataIndex: 'number',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Created on',
      dataIndex: 'created_at',
      render: text => new Date(text).toLocaleString(),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
    },
    {
      title: 'Status', //open or close
      dataIndex: 'state',
      render: text => <CapTag>{text}</CapTag>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <CapButton
          onClick={() => {
            handleRowClick(record);
          }}
        >
          View
        </CapButton>
      ),
    },
  ];

  const getData = () => {
    const formattedData = (issuesList.length ? issuesList : []).map(issue => {
      const {
        id,
        number,
        title,
        state,
        created_at,
        user: { login },
      } = issue;
      return {
        key: id,
        id,
        number,
        title,
        state,
        created_at,
        created_by: login,
      };
    });
    return formattedData;
  };

  useEffect(
    () => {
      setIssuesList([...issues]);
    },
    [issues],
  );

  useEffect(() => {
    actions.loadIssues();
    if (!currentPage) {
      history.push({
        search: `?currentPage=1`,
      });
    }
  }, []);

  const handleRowClick = rowData => {
    history.push(`${publicPath}/issues/${rowData.number}`);
  };

  const handlePagination = page => {
    history.push({
      search: `?currentPage=${page}`,
    });
  };

  return (
    <CapTable
      columns={columns}
      dataSource={getData()}
      pagination={{
        pageSize: 10,
        onChange: handlePagination,
        current: currentPage,
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  issues: getIssuesList(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'issues', saga });
const withReducer = injectReducer({ key: 'issues', reducer });

IssuesPage.defaultProps = {
  actions: {},
  issues: [],
};

IssuesPage.propTypes = {
  actions: PropTypes.object,
  issues: PropTypes.array,
};

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(IssuesPage);
