import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isAdmin = localStorage.getItem('userRole') === 'admin';
  currentUser = localStorage.getItem('userRole') === 'admin' ? 'Admin' : 'Pharmacien';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}