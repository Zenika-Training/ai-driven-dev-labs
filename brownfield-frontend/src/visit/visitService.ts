const API_BASE_URL = 'http://localhost:8080/api/v1/visit';

export interface Visit {
  id?: number;
  dateTime: string;
  clinic: string;
  petId: number;
}

export const visitService = {
  async findAll(): Promise<Visit[]> {
    const response = await fetch(API_BASE_URL);
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
