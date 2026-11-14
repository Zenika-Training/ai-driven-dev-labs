import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import VisitList from '../src/visit/VisitList';
import { visitService } from '../src/visit/visitService';
import type { Visit } from '../src/visit/visitService';

vi.mock('../src/visit/visitService', () => ({
  visitService: {
    findAll: vi.fn(),
  },
}));

const visit = (id: number, clinic: string): Visit => ({
  id,
  dateTime: '2025-11-15T09:30:00',
  clinic,
  summary: 's',
  pet: { id: 1, name: 'Max', ownerName: 'John' },
});

describe('VisitList date range filter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setDate = (testId: string, value: string) =>
    fireEvent.change(screen.getByTestId(testId), { target: { value } });

  it('should render both date inputs and load all visits initially', async () => {
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic')]);

    render(<VisitList />);

    expect(await screen.findByText('Downtown Clinic')).toBeDefined();
    expect(screen.getByTestId('visit-date-from')).toBeDefined();
    expect(screen.getByTestId('visit-date-to')).toBeDefined();
    expect(visitService.findAll).toHaveBeenCalledWith('', '');
  });

  it('should call findAll with the chosen range and list only the returned visits', async () => {
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic'), visit(2, 'North Branch')]);
    render(<VisitList />);
    await screen.findByText('North Branch');
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic')]);

    setDate('visit-date-from', '2025-11-15');
    setDate('visit-date-to', '2025-11-15');

    await waitFor(() => expect(visitService.findAll).toHaveBeenLastCalledWith('2025-11-15', '2025-11-15'));
    await waitFor(() => expect(screen.queryByText('North Branch')).toBeNull());
    expect(screen.getByText('Downtown Clinic')).toBeDefined();
  });

  it('should show the no visits message and keep the inputs when the range is empty', async () => {
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic')]);
    render(<VisitList />);
    await screen.findByText('Downtown Clinic');
    vi.mocked(visitService.findAll).mockResolvedValue([]);

    setDate('visit-date-from', '2030-01-01');

    expect(await screen.findByText('No visits found.')).toBeDefined();
    expect(screen.getByTestId('visit-date-from')).toBeDefined();
  });

  it('should show the error and keep the inputs when the backend rejects the range', async () => {
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic')]);
    render(<VisitList />);
    await screen.findByText('Downtown Clinic');
    vi.mocked(visitService.findAll).mockRejectedValue(new Error('Invalid date range'));

    setDate('visit-date-from', '2025-11-20');
    setDate('visit-date-to', '2025-11-10');

    expect(await screen.findByText(/Error: Invalid date range/)).toBeDefined();
    expect(screen.getByTestId('visit-date-from')).toBeDefined();
    expect(screen.getByTestId('visit-date-to')).toBeDefined();
  });

  it('should recover and list visits once the range is corrected', async () => {
    vi.mocked(visitService.findAll).mockRejectedValue(new Error('Invalid date range'));
    render(<VisitList />);
    await screen.findByText(/Error: Invalid date range/);
    vi.mocked(visitService.findAll).mockResolvedValue([visit(1, 'Downtown Clinic')]);

    setDate('visit-date-from', '2025-11-01');

    expect(await screen.findByText('Downtown Clinic')).toBeDefined();
  });
});
