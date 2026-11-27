import { Visit } from '../visit/visit.model';

export interface Invoice {
  id: number;
  invoiceNumber: string;
  invoiceDate: Date;
  amount: string;
  visitId: number;
  visit: Visit;
}
