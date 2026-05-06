import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://pharmacie-app-myma.onrender.com/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): string {
    return localStorage.getItem('userEmail') || 'Utilisateur';
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
}
