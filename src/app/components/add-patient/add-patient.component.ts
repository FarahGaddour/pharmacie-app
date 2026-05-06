import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  standalone: false,
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private PS: PatientService,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form = new FormGroup({
        nom: new FormControl(this.data.nom, Validators.required),
        prenom: new FormControl(this.data.prenom, Validators.required),
        telephone: new FormControl(this.data.telephone, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        nom: new FormControl(null, Validators.required),
        prenom: new FormControl(null, Validators.required),
        telephone: new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.data) {
        this.PS.updatePatient(this.data.id!, this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.PS.createPatient(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  annuler(): void {
    this.dialogRef.close(false);
  }
}
