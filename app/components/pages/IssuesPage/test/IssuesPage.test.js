import React from 'react';
import { render, screen } from '@testing-library/react';
import IssuesPage from '../IssuesPage';

describe('Issues List Page', () => {
  test('renders correctly', () => {
    render(<IssuesPage />);
    const issueListingTable = screen.getByRole('table');
    expect(issueListingTable).toBeInTheDocument();
  });
});
