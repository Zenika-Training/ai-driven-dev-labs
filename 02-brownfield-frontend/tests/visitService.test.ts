import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { visitService } from '../src/visit/visitService';

describe('visitService.findAll', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should send only the provided date parameters', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => [] });

    await visitService.findAll('2025-11-10', '');

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/visit?from=2025-11-10');
  });

  it('should send no query string without dates', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => [] });

    await visitService.findAll();

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/v1/visit');
  });

  it('should throw a date range error on a 400 response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 400 });

    await expect(visitService.findAll('2025-11-20', '2025-11-10')).rejects.toThrow(/Invalid date range/);
  });
});
