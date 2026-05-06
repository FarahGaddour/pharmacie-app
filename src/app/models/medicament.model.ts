import { Fournisseur } from './fournisseur.model';

export interface Medicament {
  id?: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
  fournisseurId: number;
  fournisseur?: Fournisseur;
}