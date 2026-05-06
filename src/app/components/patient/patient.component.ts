import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  standalone: false,
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  isAdmin = localStorage.getItem('userRole') === 'admin';

  get displayedColumns(): string[] {
    return this.isAdmin
      ? ['id', 'nom', 'prenom', 'telephone']
      : ['id', 'nom', 'prenom', 'telephone', 'actions'];
  }

  dataSource: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.patientService.getAllPatients().subscribe(data => {
      this.dataSource = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.fetch();
    });
  }

  openEdit(patient: Patient): void {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '500px',
      data: patient
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.fetch();
    });
  }

  deletePatient(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(id).subscribe(() => {
          this.fetch();
        });
      }
    });
  }
}
