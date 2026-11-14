const API_BASE_URL = 'http://localhost:8080/api/v1/visit';

export interface Pet {
  id: number;
  name: string;
  ownerName: string;
}

export interface Vet {
  id: number;
  name: string;
  specialty: string;
}

export interface Visit {
  id?: number;
  dateTime: string;
  clinic: string;
  summary: string;
  pet: Pet;
  vet?: Vet;
}

export const visitService = {
  async findAll(from?: string, to?: string): Promise<Visit[]> {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const query = params.toString();
    const response = await fetch(query ? `${API_BASE_URL}?${query}` : API_BASE_URL);
    if (response.status === 400) {
      throw new Error('Invalid date range: the "From" date must not be after the "To" date');
    }
    if (!response.ok) {
      throw new Error('Failed to fetch visits');
    }
    return response.json();
  },

  async findById(id: number): Promise<Visit> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch visit with id ${id}`);
    }
    return response.json();
  },

  async findByPetId(petId: number): Promise<Visit[]> {
    const response = await fetch(`${API_BASE_URL}/pet/${petId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch visits for pet with id ${petId}`);
    }
    return response.json();
  },
};
