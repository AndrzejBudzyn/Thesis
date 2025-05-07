import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryUserPanel from '../components/UserPanel/HistoryUserPanel';
import '@testing-library/jest-dom';

describe('HistoryUserPanel', () => {
  test('renders initial 10 items', () => {
    render(<HistoryUserPanel />);
    const items = screen.getAllByText(/Historia \d+/);
    expect(items).toHaveLength(10);
  });

  test('renders pagination controls', () => {
    render(<HistoryUserPanel />);
    expect(screen.getByText(/Poprzednia/i)).toBeInTheDocument();
    expect(screen.getByText(/Następna/i)).toBeInTheDocument();
    expect(screen.getByText(/Strona 1 z 4/i)).toBeInTheDocument();
  });

  test('next page shows new items', () => {
    render(<HistoryUserPanel />);
    fireEvent.click(screen.getByText(/Następna/i));
    expect(screen.getByText(/Strona 2 z 4/i)).toBeInTheDocument();
    expect(screen.getByText('Historia 11')).toBeInTheDocument();
  });

  test('previous page works correctly', () => {
    render(<HistoryUserPanel />);
    fireEvent.click(screen.getByText(/Następna/i));
    fireEvent.click(screen.getByText(/Poprzednia/i));
    expect(screen.getByText(/Strona 1 z 4/i)).toBeInTheDocument();
    expect(screen.getByText('Historia 1')).toBeInTheDocument();
  });

  test('disables button on first page', () => {
    render(<HistoryUserPanel />);
    const prevButton = screen.getByText(/Poprzednia/i);
    expect(prevButton).toBeDisabled();
  });

  test('disables button on last page', () => {
    render(<HistoryUserPanel />);
    const nextButton = screen.getByText(/Następna/i);
    for (let i = 0; i < 3; i++) {
      fireEvent.click(nextButton);
    }
    expect(screen.getByText(/Strona 4 z 4/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
