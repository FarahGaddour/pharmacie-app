import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentService } from '../../../services/medicament.service';
import { FournisseurService } from '../../../services/fournisseur.service';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
  standalone: false,
  selector: 'app-edit-medicament',
  templateUrl: './edit-medicament.component.html',
  styleUrls: ['./edit-medicament.component.css']
})
export class EditMedicamentComponent implements OnInit {

  medicamentForm: FormGroup;
  fournisseurs: Fournisseur[] = [];
  medicamentId!: number;

  constructor(
    private fb: FormBuilder,
    private medicamentService: MedicamentService,
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
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
    this.medicamentId = Number(this.route.snapshot.paramMap.get('id'));
    this.fournisseurService.getAllFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    });
    this.medicamentService.getMedicamentById(this.medicamentId).subscribe(data => {
      this.medicamentForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.medicamentForm.valid) {
      this.medicamentService.updateMedicament(this.medicamentId, this.medicamentForm.value).subscribe(() => {
        this.router.navigate(['/medicaments']);
      });
    }
  }

  annuler() {
    this.router.navigate(['/medicaments']);
  }
}