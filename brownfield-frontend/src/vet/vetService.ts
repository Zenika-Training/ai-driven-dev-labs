const API_BASE_URL = 'http://localhost:8080/api/v1/vet';

export interface Vet {
  id?: number;
  name: string;
  specialty: string;
}

export const vetService = {
  async findAll(): Promise<Vet[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch vets');
    }
    return response.json();
  },

  async findById(id: number): Promise<Vet> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vet');
    }
    return response.json();
  },

  async findByName(name: string): Promise<Vet> {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vet');
    }
    return response.json();
  }
};
