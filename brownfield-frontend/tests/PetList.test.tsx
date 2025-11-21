import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PetList from '../src/pet/PetList';
import { petService } from '../src/pet/petService';
import type { Pet } from '../src/pet/petService';

vi.mock('../src/pet/petService', () => ({
  petService: {
    findAll: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('PetList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    vi.mocked(petService.findAll).mockImplementation(() => new Promise(() => {}));

    render(<PetList />);

    expect(screen.getByText('Loading pets...')).toBeDefined();
  });

  it('should display pet list when loaded successfully', async () => {
    const mockPets: Pet[] = [
      { id: 1, name: 'Max', ownerName: 'John' },
      { id: 2, name: 'Bella', ownerName: 'Jane' },
    ];

    vi.mocked(petService.findAll).mockResolvedValue(mockPets);

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByText('Pet List')).toBeDefined();
      expect(screen.getByText('Max')).toBeDefined();
      expect(screen.getByText('Bella')).toBeDefined();
      expect(screen.getByText('John')).toBeDefined();
      expect(screen.getByText('Jane')).toBeDefined();
    });
  });

  it('should display error message when fetch fails', async () => {
    vi.mocked(petService.findAll).mockRejectedValue(new Error('Failed to load pets'));

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeDefined();
      expect(screen.getByText(/Failed to load pets/)).toBeDefined();
    });
  });

  it('should display no pets message when list is empty', async () => {
    vi.mocked(petService.findAll).mockResolvedValue([]);

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByText('No pets found.')).toBeDefined();
    });
  });

  it('should display table headers when pets are loaded', async () => {
    const mockPets: Pet[] = [
      { id: 1, name: 'Max', ownerName: 'John' },
    ];

    vi.mocked(petService.findAll).mockResolvedValue(mockPets);

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeDefined();
      expect(screen.getByText('Name')).toBeDefined();
      expect(screen.getByText('Owner Name')).toBeDefined();
      expect(screen.getByText('Actions')).toBeDefined();
    });
  });
});
