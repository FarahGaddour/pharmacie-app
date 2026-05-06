import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  erreurMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userEmail', user.email);
            this.router.navigate(['/dashboard']);
          } else {
            this.erreurMessage = 'Email ou mot de passe incorrect !';
            this.loading = false;
          }
        },
        error: () => {
          this.erreurMessage = 'Erreur de connexion au serveur.';
          this.loading = false;
        }
      });
    }
  }
}