import { lazy } from 'react';
import * as path from '../../../config/path';

const { publicPath } = path;

const routes = [
  {
    exact: true,
    path: `${publicPath}/dashboard`,
    type: 'dashboard',
    component: lazy(() => import('../Dashboard')),
  },
  {
    exact: true,
    path: `${publicPath}/accessForbidden`,
    type: 'authenticationFlow',
    component: lazy(() => import('../AccessForbidden')),
  },
  {
    exact: true,
    path: `${publicPath}/issues`,
    type: 'issues',
    component: lazy(() => import('../IssuesPage')),
  },
  {
    exact: true,
    path: `${publicPath}/issues/:issueId`,
    type: 'issuesDetails',
    component: lazy(() => import('../IssuesDetailsPage')),
  },
];

export default routes;
