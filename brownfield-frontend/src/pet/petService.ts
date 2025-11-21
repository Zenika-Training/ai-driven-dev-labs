const API_BASE_URL = 'http://localhost:8080/api/v1/pet';

export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}

export const petService = {
  async findAll(): Promise<Pet[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch pets');
    }
    return response.json();
  },

  async findById(id: number): Promise<Pet> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pet with id ${id}`);
    }
    return response.json();
  },

  async findByName(name: string): Promise<Pet> {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pet with name ${name}`);
    }
    return response.json();
  },

  async save(pet: Pet): Promise<Pet> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
    });
    if (!response.ok) {
      throw new Error('Failed to save pet');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete pet with id ${id}`);
    }
  },
};
