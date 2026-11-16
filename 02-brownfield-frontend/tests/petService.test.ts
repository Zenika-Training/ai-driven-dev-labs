import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { petService } from '../src/pet/petService';
import type { Pet } from '../src/pet/petService';

describe('petService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('findAll', () => {
    it('should fetch all pets successfully', async () => {
      const mockPets: Pet[] = [
        { id: 1, name: 'Max', ownerName: 'John' },
        { id: 2, name: 'Bella', ownerName: 'Jane' },
      ];

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPets,
      });

      const result = await petService.findAll();

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/pet');
      expect(result).toEqual(mockPets);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(petService.findAll()).rejects.toThrow('Failed to fetch pets');
    });
  });

  describe('findById', () => {
    it('should fetch pet by id successfully', async () => {
      const mockPet: Pet = { id: 1, name: 'Max', ownerName: 'John' };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPet,
      });

      const result = await petService.findById(1);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/pet/1');
      expect(result).toEqual(mockPet);
    });

    it('should throw error when pet not found', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(petService.findById(999)).rejects.toThrow('Failed to fetch pet with id 999');
    });
  });

  describe('findByName', () => {
    it('should fetch pet by name successfully', async () => {
      const mockPet: Pet = { id: 1, name: 'Max', ownerName: 'John' };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPet,
      });

      const result = await petService.findByName('Max');

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/pet/name/Max');
      expect(result).toEqual(mockPet);
    });

    it('should throw error when pet not found by name', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(petService.findByName('Unknown')).rejects.toThrow('Failed to fetch pet with name Unknown');
    });
  });

  describe('save', () => {
    it('should save pet successfully', async () => {
      const newPet: Pet = { name: 'Charlie', ownerName: 'Alice' };
      const savedPet: Pet = { id: 3, name: 'Charlie', ownerName: 'Alice' };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => savedPet,
      });

      const result = await petService.save(newPet);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPet),
      });
      expect(result).toEqual(savedPet);
    });

    it('should throw error when save fails', async () => {
      const newPet: Pet = { name: 'Charlie', ownerName: 'Alice' };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(petService.save(newPet)).rejects.toThrow('Failed to save pet');
    });
  });

  describe('delete', () => {
    it('should delete pet successfully', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      });

      await petService.delete(1);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/pet/1', {
        method: 'DELETE',
      });
    });

    it('should throw error when delete fails', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(petService.delete(999)).rejects.toThrow('Failed to delete pet with id 999');
    });
  });
});
