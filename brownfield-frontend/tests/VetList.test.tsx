import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import VetList from '../src/vet/VetList';
import { vetService } from '../src/vet/vetService';

vi.mock('../src/vet/vetService', () => ({
  vetService: {
    findAll: vi.fn(),
  },
}));

describe('VetList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const surgeon = { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' };
  const dentist = { id: 2, name: 'Dr. James Chen', specialty: 'Dentistry' };
  const mockBySpecialty = (surgeryResult: typeof surgeon[]) =>
    vi.mocked(vetService.findAll).mockImplementation(async (specialty?: string) =>
      specialty === 'Surgery' ? surgeryResult : [surgeon, dentist]
    );
  const selectSpecialty = (value: string) =>
    fireEvent.change(screen.getByTestId('specialty-filter'), { target: { value } });

  it('should filter vets by the selected specialty', async () => {
    mockBySpecialty([surgeon]);
    render(<VetList />);
    await waitFor(() => expect(screen.getByText('Dr. James Chen')).toBeDefined());

    selectSpecialty('Surgery');

    await waitFor(() => expect(screen.queryByText('Dr. James Chen')).toBeNull());
    expect(screen.getByText('Dr. Sarah Martinez')).toBeDefined();
    expect(vetService.findAll).toHaveBeenLastCalledWith('Surgery');
  });

  it('should show all vets again when all specialties is selected', async () => {
    mockBySpecialty([surgeon]);
    render(<VetList />);
    await waitFor(() => expect(screen.getByText('Dr. James Chen')).toBeDefined());
    selectSpecialty('Surgery');
    await waitFor(() => expect(screen.queryByText('Dr. James Chen')).toBeNull());

    selectSpecialty('');

    await waitFor(() => expect(screen.getByText('Dr. James Chen')).toBeDefined());
    expect(screen.getByText('Dr. Sarah Martinez')).toBeDefined();
  });

  it('should keep the selector and show a message when a specialty has no vet', async () => {
    mockBySpecialty([]);
    render(<VetList />);
    await waitFor(() => expect(screen.getByText('Dr. James Chen')).toBeDefined());

    selectSpecialty('Surgery');

    await waitFor(() => expect(screen.getByText('No vets found.')).toBeDefined());
    expect(screen.getByTestId('specialty-filter')).toBeDefined();
  });

  it('should display a message when the API returns no vets', async () => {
    vi.mocked(vetService.findAll).mockResolvedValue([]);

    render(<VetList />);

    await waitFor(() => {
      expect(screen.getByText('No vets found.')).toBeDefined();
    });
  });
});
