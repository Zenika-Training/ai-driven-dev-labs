import { Pet } from '../pet/pet.model';
import { Vet } from '../vet/vet.model';

export interface Visit {
  id: number;
  dateTime: Date;
  clinic: string;
  summary: string;
  petId: number;
  vetId: number | null;
  pet: Pet;
  vet: Vet | null;
}
