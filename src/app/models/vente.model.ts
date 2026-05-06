export interface Vente {
  id?: number;
  medicamentId: number;
  patientId: number;
  quantite: number;
  date: string;
  pharmacienEmail: string;
}