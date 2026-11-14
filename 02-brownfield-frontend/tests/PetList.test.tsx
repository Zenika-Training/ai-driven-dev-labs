import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    render(<PetList onPetSelect={vi.fn()} />);

    expect(screen.getByText('Loading pets...')).toBeDefined();
  });

  it('should display pet list when loaded successfully', async () => {
    const mockPets: Pet[] = [
      { id: 1, name: 'Max', ownerName: 'John' },
      { id: 2, name: 'Bella', ownerName: 'Jane' },
    ];

    vi.mocked(petService.findAll).mockResolvedValue(mockPets);

    render(<PetList onPetSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('All Pets')).toBeDefined();
      expect(screen.getByText('Max')).toBeDefined();
      expect(screen.getByText('Bella')).toBeDefined();
      expect(screen.getByText('John')).toBeDefined();
      expect(screen.getByText('Jane')).toBeDefined();
    });
  });

  it('should display error message when fetch fails', async () => {
    vi.mocked(petService.findAll).mockRejectedValue(new Error('Failed to load pets'));

    render(<PetList onPetSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeDefined();
      expect(screen.getByText(/Failed to load pets/)).toBeDefined();
    });
  });

  it('should display no pets message when list is empty', async () => {
    vi.mocked(petService.findAll).mockResolvedValue([]);

    render(<PetList onPetSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('No pets found.')).toBeDefined();
    });
  });

  describe('owner name filter', () => {
    const john: Pet[] = [
      { id: 1, name: 'Max', ownerName: 'John Smith' },
      { id: 3, name: 'Charlie', ownerName: 'John Smith' },
    ];
    const all: Pet[] = [...john, { id: 2, name: 'Bella', ownerName: 'Sarah Johnson' }];

    const renderLoaded = async (onPetSelect = vi.fn()) => {
      vi.mocked(petService.findAll).mockResolvedValue(all);
      render(<PetList onPetSelect={onPetSelect} />);
      await screen.findByText('Bella');
    };

    const type = (value: string) =>
      fireEvent.change(screen.getByTestId('owner-name-filter'), { target: { value } });

    const debounce = () => act(() => vi.advanceTimersByTimeAsync(300));

    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should render the filter input', async () => {
      await renderLoaded();

      expect(screen.getByTestId('owner-name-filter')).toBeDefined();
    });

    it('should call findAll with the typed text after the debounce and list only returned pets', async () => {
      await renderLoaded();
      vi.mocked(petService.findAll).mockResolvedValue(john);

      type('smith');
      await debounce();

      await waitFor(() => expect(petService.findAll).toHaveBeenLastCalledWith('smith'));
      await waitFor(() => expect(screen.queryByText('Bella')).toBeNull());
      expect(screen.getByText('Max')).toBeDefined();
      expect(screen.getByText('Charlie')).toBeDefined();
    });

    it('should keep the input in the document while the refetch is pending', async () => {
      await renderLoaded();
      vi.mocked(petService.findAll).mockImplementation(() => new Promise(() => {}));

      type('smith');
      await debounce();

      expect(screen.getByTestId('owner-name-filter')).toBeDefined();
      expect(screen.queryByText('Loading pets...')).toBeNull();
    });

    it('should show all pets again when the filter is cleared', async () => {
      await renderLoaded();
      vi.mocked(petService.findAll).mockResolvedValue(john);
      type('smith');
      await debounce();
      await waitFor(() => expect(screen.queryByText('Bella')).toBeNull());
      vi.mocked(petService.findAll).mockResolvedValue(all);

      type('');
      await debounce();

      await waitFor(() => expect(petService.findAll).toHaveBeenLastCalledWith(''));
      expect(await screen.findByText('Bella')).toBeDefined();
    });

    it('should send whitespace-only input as typed and show the full list', async () => {
      await renderLoaded();

      type('   ');
      await debounce();

      await waitFor(() => expect(petService.findAll).toHaveBeenLastCalledWith('   '));
      expect(await screen.findByText('Bella')).toBeDefined();
    });

    it('should show no pets message and keep the input when nothing matches', async () => {
      await renderLoaded();
      vi.mocked(petService.findAll).mockResolvedValue([]);

      type('xyz');
      await debounce();

      expect(await screen.findByText('No pets found.')).toBeDefined();
      expect(screen.getByTestId('owner-name-filter')).toBeDefined();
    });

    it('should keep the input mounted and show the error when a refetch fails', async () => {
      await renderLoaded();
      vi.mocked(petService.findAll).mockRejectedValue(new Error('Failed to load pets'));

      type('smith');
      await debounce();

      expect(await screen.findByText(/Error: Failed to load pets/)).toBeDefined();
      expect(screen.getByTestId('owner-name-filter')).toBeDefined();
    });

    it('should keep the columns and call onPetSelect when a filtered row is clicked', async () => {
      const onPetSelect = vi.fn();
      await renderLoaded(onPetSelect);
      vi.mocked(petService.findAll).mockResolvedValue(john);
      type('smith');
      await debounce();
      await waitFor(() => expect(screen.queryByText('Bella')).toBeNull());

      fireEvent.click(screen.getByText('Max'));

      expect(screen.getByText('ID')).toBeDefined();
      expect(screen.getByText('Name')).toBeDefined();
      expect(screen.getByText('Owner Name')).toBeDefined();
      expect(onPetSelect).toHaveBeenCalledWith(john[0]);
    });
  });

  it('should display table headers when pets are loaded', async () => {
    const mockPets: Pet[] = [
      { id: 1, name: 'Max', ownerName: 'John' },
    ];

    vi.mocked(petService.findAll).mockResolvedValue(mockPets);

    render(<PetList onPetSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeDefined();
      expect(screen.getByText('Name')).toBeDefined();
      expect(screen.getByText('Owner Name')).toBeDefined();
    });
  });
});
