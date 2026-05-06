import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VenteService } from '../../services/vente.service';
import { MedicamentService } from '../../services/medicament.service';
import { PatientService } from '../../services/patient.service';
import { Medicament } from '../../models/medicament.model';
import { Patient } from '../../models/patient.model';

@Component({
  standalone: false,
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  venteForm: FormGroup;
  medicaments: Medicament[] = [];
  patients: Patient[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private venteService: VenteService,
    private medicamentService: MedicamentService,
    private patientService: PatientService,
    private dialog: MatDialog
  ) {
    this.venteForm = this.fb.group({
      medicamentId: ['', Validators.required],
      patientId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.medicamentService.getAllMedicaments().subscribe(data => {
      this.medicaments = data;
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    });
  }

  ajouterPatient() {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.patientService.getAllPatients().subscribe(data => {
          this.patients = data;
        });
      }
    });
  }

  onSubmit() {
    if (this.venteForm.valid) {
      const { medicamentId, patientId, quantite } = this.venteForm.value;
      const medicament = this.medicaments.find(m => m.id == medicamentId);

      if (!medicament) {
        this.errorMessage = 'Médicament introuvable !';
        return;
      }

      if (medicament.stock < quantite) {
        this.errorMessage = 'Stock insuffisant ! Stock disponible : ' + medicament.stock;
        return;
      }

      this.medicamentService.updateMedicament(medicamentId, {
        ...medicament,
        stock: medicament.stock - quantite
      }).subscribe(() => {
        this.venteService.createVente({
          medicamentId,
          patientId,
          quantite,
          date: new Date().toISOString(),
          pharmacienEmail: localStorage.getItem('userEmail') || ''
        }).subscribe(() => {
          this.successMessage = 'Vente effectuée avec succès !';
          this.errorMessage = '';
          this.venteForm.reset();
        });
      });
    }
  }
}