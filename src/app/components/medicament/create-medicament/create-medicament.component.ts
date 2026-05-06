import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicamentService } from '../../../services/medicament.service';
import { FournisseurService } from '../../../services/fournisseur.service';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
  standalone: false,
  selector: 'app-create-medicament',
  templateUrl: './create-medicament.component.html',
  styleUrls: ['./create-medicament.component.css']
})
export class CreateMedicamentComponent implements OnInit {

  medicamentForm: FormGroup;
  fournisseurs: Fournisseur[] = [];

  constructor(
    private fb: FormBuilder,
    private medicamentService: MedicamentService,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {
    this.medicamentForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      fournisseurId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    });
  }

  onSubmit() {
    if (this.medicamentForm.valid) {
      this.medicamentService.createMedicament(this.medicamentForm.value).subscribe(() => {
        this.router.navigate(['/medicaments']);
      });
    }
  }

  annuler() {
    this.router.navigate(['/medicaments']);
  }
}