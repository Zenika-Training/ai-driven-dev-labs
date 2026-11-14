import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

  it('should display a message when the API returns no vets', async () => {
    vi.mocked(vetService.findAll).mockResolvedValue([]);

    render(<VetList />);

    await waitFor(() => {
      expect(screen.getByText('No vets found.')).toBeDefined();
    });
  });
});
