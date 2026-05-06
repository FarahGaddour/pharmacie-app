import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vente } from '../models/vente.model';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = 'https://pharmacie-app-myma.onrender.com/ventes';

  constructor(private http: HttpClient) {}

  getAllVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.apiUrl);
  }

  createVente(vente: Vente): Observable<Vente> {
    return this.http.post<Vente>(this.apiUrl, vente);
  }
}